const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/farming_forum')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join_topic', (topicId) => {
    socket.join(topicId);
  });

  socket.on('leave_topic', (topicId) => {
    socket.leave(topicId);
  });

  socket.on('new_comment', (data) => {
    io.to(data.topicId).emit('comment_added', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 