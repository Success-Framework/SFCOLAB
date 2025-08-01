import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  // Track connected users
  const users = new Map();

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Set user ID
    socket.on("setUser", (userId) => {
      socket.userId = userId;
      users.set(userId, socket.id); // Store user ID to socket ID mapping
      socket.join(userId); // Join a room with the user ID
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
        };

        // Emit to recipient if they're connected
        if (users.has(message.recipientId)) {
          io.to(message.recipientId).emit("newMessage", fullMessage);
        }

        // Always emit back to sender as confirmation
        // socket.emit("messageDelivered", fullMessage);

        callback({ status: "success", message: fullMessage });
      } catch (err) {
        console.error("Message error:", err);
        callback({ status: "error", message: err.message });
      }
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        users.delete(socket.userId);
        console.log(`User ${socket.userId} disconnected`);
      }
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};
