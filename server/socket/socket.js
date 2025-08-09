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
    serveClient: false,
    maxHttpBufferSize: 100e6,
    pingTimeout: 60000,
  });

  // Track connected users and their unread messages
  const users = new Map();
  const unreadMessages = new Map();

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("setUser", (userId) => {
      socket.userId = userId;
      users.set(userId, socket.id);
      socket.join(userId);

      if (!unreadMessages.has(userId)) {
        unreadMessages.set(userId, new Set());
      }

      socket.emit("initialOnlineStatus", Array.from(users.keys()));

      socket.broadcast.emit("userOnline", userId);

      console.log(`User ${userId} connected`);
    });

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

        if (users.has(message.recipientId)) {
          unreadMessages.get(message.recipientId).add(fullMessage.id);
        }

        if (users.has(message.recipientId)) {
          io.to(message.recipientId).emit("newMessage", fullMessage);

          io.to(message.recipientId).emit("unreadCountUpdate", {
            count: unreadMessages.get(message.recipientId).size,
          });
        }

        if (typeof callback === "function") {
          callback({ status: "success", message: fullMessage });
        }
      } catch (err) {
        console.error("Message error:", err);
        if (typeof callback === "function") {
          callback({ status: "error", message: err.message });
        }
      }
    });

    socket.on("markAsRead", (messageIds, callback) => {
      try {
        if (!socket.userId) throw new Error("User not identified");

        const userUnread = unreadMessages.get(socket.userId) || new Set();
        messageIds.forEach((id) => userUnread.delete(id));

        io.to(socket.userId).emit("unreadCountUpdate", {
          count: userUnread.size,
        });

        if (typeof callback === "function") {
          callback({ status: "success", message: fullMessage });
        }
      } catch (err) {
        console.error("Mark as read error:", err);
        if (typeof callback === "function") {
          callback({ status: "error", message: err.message });
        }
      }
    });

    socket.on("subscribeToNotifications", (userId) => {
      socket.join(`notifications_${userId}`);
      console.log(`User ${userId} subscribed to notifications`);
    });

    socket.on("unsubscribeFromNotifications", (userId) => {
      socket.leave(`notifications_${userId}`);
      console.log(`User ${userId} unsubscribed from notifications`);
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        const userId = socket.userId;
        users.delete(userId);

        io.emit("userOffline", userId);
        console.log(`User ${userId} disconnected`);
      }
      console.log("Client disconnected:", socket.id);
    });
  });

  io.sendNotification = (userId, notification) => {
    const notificationWithId = {
      ...notification,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
    };
    io.to(`notifications_${userId}`).emit(
      "newNotification",
      notificationWithId
    );
  };
  // test value
  // io.sendTestNotification = (userId) => {
  //   const testNotification = {
  //     title: "SERVER-SIDE TEST",
  //     message: `hello⌛ Server-generated at ${new Date().toLocaleTimeString()}`,
  //     type: "server-test",
  //     urgent: true,
  //   };

  //   io.to(`notifications_${userId}`).emit("newNotification", {
  //     ...testNotification,
  //     id: uuidv4(),
  //     timestamp: new Date().toISOString(),
  //   });

  //   console.log(`📡 Sent test notification to user ${userId}`);
  // };

// Testing the server on automstic start
  // setTimeout(() => {
  //   const testUserId = "2"; 
  //   console.log("Sending automatic test notification to user", testUserId);
  //   io.sendTestNotification(testUserId);
  // }, 3000);
  return io;
};
