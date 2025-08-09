// server.js
import http from 'http';
import { createApp } from './app.js';
import { initializeSocket } from './socket/socket.js';

// Create basic Express app
const app = createApp();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// Start server
server.listen(3001, () => {
  console.log('Server running on port 3001');
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});