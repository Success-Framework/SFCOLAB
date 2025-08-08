const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class SocketService {
  constructor(server) {
    this.io = socketIo(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    this.connectedUsers = new Map(); // userId -> socket
    this.userRooms = new Map(); // userId -> rooms

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  // Setup authentication middleware
  setupMiddleware() {
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
        
        if (!token) {
          return next(new Error('Authentication error'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password -refreshToken');
        
        if (!user) {
          return next(new Error('User not found'));
        }

        socket.user = user;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });
  }

  // Setup event handlers
  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.user.profile.name} (${socket.user._id})`);
      
      this.handleConnection(socket);
      this.handleDisconnection(socket);
      this.handleChatEvents(socket);
      this.handleNotificationEvents(socket);
      this.handleProjectEvents(socket);
      this.handleStartupEvents(socket);
    });
  }

  // Handle user connection
  handleConnection(socket) {
    const userId = socket.user._id.toString();
    
    // Store connected user
    this.connectedUsers.set(userId, socket);
    
    // Join user's personal room
    socket.join(`user:${userId}`);
    
    // Join user's startup rooms if they're a founder
    this.joinStartupRooms(socket);
    
    // Join user's project rooms if they're a collaborator
    this.joinProjectRooms(socket);
    
    // Emit user online status
    this.io.emit('user:online', {
      userId,
      username: socket.user.username,
      name: socket.user.profile.name
    });
  }

  // Handle user disconnection
  handleDisconnection(socket) {
    const userId = socket.user._id.toString();
    
    // Remove from connected users
    this.connectedUsers.delete(userId);
    
    // Emit user offline status
    this.io.emit('user:offline', {
      userId,
      username: socket.user.username,
      name: socket.user.profile.name
    });
    
    console.log(`User disconnected: ${socket.user.profile.name} (${userId})`);
  }

  // Handle chat events
  handleChatEvents(socket) {
    // Join chat room
    socket.on('chat:join', (data) => {
      const { roomId } = data;
      socket.join(`chat:${roomId}`);
      console.log(`User ${socket.user.profile.name} joined chat room: ${roomId}`);
    });

    // Leave chat room
    socket.on('chat:leave', (data) => {
      const { roomId } = data;
      socket.leave(`chat:${roomId}`);
      console.log(`User ${socket.user.profile.name} left chat room: ${roomId}`);
    });

    // Send message
    socket.on('chat:message', (data) => {
      const { roomId, message, type = 'text' } = data;
      
      const messageData = {
        id: Date.now().toString(),
        roomId,
        sender: {
          id: socket.user._id,
          name: socket.user.profile.name,
          avatar: socket.user.profile.avatar,
          username: socket.user.username
        },
        message,
        type,
        timestamp: new Date()
      };

      // Broadcast to room
      this.io.to(`chat:${roomId}`).emit('chat:message', messageData);
      
      // Store message in database (you can implement this)
      this.storeChatMessage(messageData);
    });

    // Typing indicator
    socket.on('chat:typing', (data) => {
      const { roomId, isTyping } = data;
      
      socket.to(`chat:${roomId}`).emit('chat:typing', {
        userId: socket.user._id,
        username: socket.user.username,
        name: socket.user.profile.name,
        isTyping
      });
    });
  }

  // Handle notification events
  handleNotificationEvents(socket) {
    // Send notification to specific user
    socket.on('notification:send', (data) => {
      const { userId, notification } = {
        id: Date.now().toString(),
        type: 'info',
        title: '',
        message: '',
        timestamp: new Date(),
        read: false,
        ...data.notification
      };

      this.sendNotificationToUser(userId, notification);
    });

    // Mark notification as read
    socket.on('notification:read', (data) => {
      const { notificationId } = data;
      // Update notification in database (implement this)
      this.markNotificationAsRead(socket.user._id, notificationId);
    });
  }

  // Handle project events
  handleProjectEvents(socket) {
    // Project updates
    socket.on('project:update', (data) => {
      const { projectId, update } = data;
      
      // Notify project collaborators
      this.io.to(`project:${projectId}`).emit('project:updated', {
        projectId,
        update,
        updatedBy: {
          id: socket.user._id,
          name: socket.user.profile.name,
          username: socket.user.username
        },
        timestamp: new Date()
      });
    });

    // New project comment
    socket.on('project:comment', (data) => {
      const { projectId, comment } = data;
      
      this.io.to(`project:${projectId}`).emit('project:commented', {
        projectId,
        comment: {
          ...comment,
          author: {
            id: socket.user._id,
            name: socket.user.profile.name,
            username: socket.user.username,
            avatar: socket.user.profile.avatar
          },
          timestamp: new Date()
        }
      });
    });
  }

  // Handle startup events
  handleStartupEvents(socket) {
    // Startup updates
    socket.on('startup:update', (data) => {
      const { startupId, update } = data;
      
      this.io.to(`startup:${startupId}`).emit('startup:updated', {
        startupId,
        update,
        updatedBy: {
          id: socket.user._id,
          name: socket.user.profile.name,
          username: socket.user.username
        },
        timestamp: new Date()
      });
    });
  }

  // Join startup rooms for founders
  async joinStartupRooms(socket) {
    try {
      const Startup = require('../models/Startup');
      const userStartups = await Startup.find({ founder: socket.user._id });
      
      userStartups.forEach(startup => {
        socket.join(`startup:${startup._id}`);
        console.log(`User ${socket.user.profile.name} joined startup room: ${startup.name}`);
      });
    } catch (error) {
      console.error('Error joining startup rooms:', error);
    }
  }

  // Join project rooms for collaborators
  async joinProjectRooms(socket) {
    try {
      const Project = require('../models/Project');
      const userProjects = await Project.find({
        $or: [
          { author: socket.user._id },
          { 'collaborators.user': socket.user._id }
        ]
      });
      
      userProjects.forEach(project => {
        socket.join(`project:${project._id}`);
        console.log(`User ${socket.user.profile.name} joined project room: ${project.header}`);
      });
    } catch (error) {
      console.error('Error joining project rooms:', error);
    }
  }

  // Send notification to specific user
  sendNotificationToUser(userId, notification) {
    const userSocket = this.connectedUsers.get(userId.toString());
    
    if (userSocket) {
      userSocket.emit('notification:new', notification);
    }
    
    // Store notification in database (implement this)
    this.storeNotification(userId, notification);
  }

  // Send notification to multiple users
  sendNotificationToUsers(userIds, notification) {
    userIds.forEach(userId => {
      this.sendNotificationToUser(userId, notification);
    });
  }

  // Broadcast to all connected users
  broadcastToAll(event, data) {
    this.io.emit(event, data);
  }

  // Broadcast to specific room
  broadcastToRoom(roomId, event, data) {
    this.io.to(roomId).emit(event, data);
  }

  // Get connected users count
  getConnectedUsersCount() {
    return this.connectedUsers.size;
  }

  // Get connected users list
  getConnectedUsers() {
    return Array.from(this.connectedUsers.keys());
  }

  // Store chat message (implement database storage)
  async storeChatMessage(messageData) {
    try {
      // Implement chat message storage
      // const ChatMessage = require('../models/ChatMessage');
      // await ChatMessage.create(messageData);
      console.log('Chat message stored:', messageData.id);
    } catch (error) {
      console.error('Error storing chat message:', error);
    }
  }

  // Store notification (implement database storage)
  async storeNotification(userId, notification) {
    try {
      // Implement notification storage
      // const Notification = require('../models/Notification');
      // await Notification.create({ userId, ...notification });
      console.log('Notification stored for user:', userId);
    } catch (error) {
      console.error('Error storing notification:', error);
    }
  }

  // Mark notification as read (implement database update)
  async markNotificationAsRead(userId, notificationId) {
    try {
      // Implement notification update
      // const Notification = require('../models/Notification');
      // await Notification.findByIdAndUpdate(notificationId, { read: true });
      console.log('Notification marked as read:', notificationId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  // Get socket instance
  getIO() {
    return this.io;
  }
}

module.exports = SocketService; 