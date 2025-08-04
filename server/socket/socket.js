import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
    // Increased the file upload size and ping time as websockets limit is 1mb
    // Based on the fact data are being stored in local-storage it may difficult uploading files of large size.
    maxHttpBufferSize: 100e6, 
    pingTimeout: 60000,
  });

  // Track connected users and their unread messages
  const users = new Map();
  const unreadMessages = new Map();

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Set user ID
    socket.on("setUser", (userId) => {
      socket.userId = userId;
      users.set(userId, socket.id);
      socket.join(userId);

      // Initialize unread messages set if it doesn't exist
      if (!unreadMessages.has(userId)) {
        unreadMessages.set(userId, new Set());
      }

      // Send complete online list to the new user
      socket.emit("initialOnlineStatus", Array.from(users.keys()));

      // Broadcast to others that this user came online
      socket.broadcast.emit("userOnline", userId);

      console.log(`User ${userId} connected`);
    });

    // Message relay
    socket.on("sendMessage", (message, callback) => {
      try {
        if (!socket.userId) throw new Error("User not identified");
        if (!message.recipientId) throw new Error("No recipient specified");

        const fullMessage = {
          id: uuidv4(),
          senderId: socket.userId,
          senderName: message.senderName || "Unknown",
          recipientId: message.recipientId,
          content: message.content,
          file: message.file || null,
          timestamp: new Date().toISOString(),
          status: "delivered",
          isRead: false,
        };

        // Add to recipient's unread messages if they're not currently viewing the chat
        if (users.has(message.recipientId)) {
          unreadMessages.get(message.recipientId).add(fullMessage.id);
        }

        // Emit to recipient if they're connected
        if (users.has(message.recipientId)) {
          io.to(message.recipientId).emit("newMessage", fullMessage);

          // Notify recipient about new unread message
          io.to(message.recipientId).emit("unreadCountUpdate", {
            count: unreadMessages.get(message.recipientId).size,
          });
        }

        callback({ status: "success", message: fullMessage });
      } catch (err) {
        console.error("Message error:", err);
        callback({ status: "error", message: err.message });
      }
    });

    // Mark messages as read
    socket.on("markAsRead", (messageIds, callback) => {
      try {
        if (!socket.userId) throw new Error("User not identified");

        const userUnread = unreadMessages.get(socket.userId) || new Set();
        messageIds.forEach((id) => userUnread.delete(id));

        // Update unread count
        io.to(socket.userId).emit("unreadCountUpdate", {
          count: userUnread.size,
        });

        callback({ status: "success" });
      } catch (err) {
        console.error("Mark as read error:", err);
        callback({ status: "error", message: err.message });
      }
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        const userId = socket.userId;
        users.delete(userId);

        // Broadcast to all clients that this user went offline
        io.emit("userOffline", userId);
        console.log(`User ${userId} disconnected`);
      }
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};
