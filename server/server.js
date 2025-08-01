import http from 'http';
import { createApp } from './app.js';
import { initializeSocket } from './socket/socket.js';

// Initialize app and server
const app = createApp();
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});