const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const socketIO = require('socket.io');
require('dotenv').config();

const connectDB = require('./config/db');

// Route files
const dashboardRoutes = require('./routes/dashboardRoutes');
const submissionRoutes = require('./routes/submission');
const authRoutes = require('./routes/auth');
const consultationRoutes = require('./routes/consultation');
const chatRoutes = require('./routes/chat');
const doctorAuthRoutes = require('./routes/doctorAuth');
const doctorRoutes = require('./routes/doctor');
const routineRoutes = require('./routes/routine');

const app = express();
const server = http.createServer(app);

// Environment variables
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// CORS configuration
const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('CORS policy check failed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads serving with safety headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.set('X-Content-Type-Options', 'nosniff');
  }
}));

// Socket.IO setup with CORS
const io = socketIO(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST']
  },
});

// Database Connection
connectDB();

// API Routes
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', submissionRoutes);
app.use('/api/routine', routineRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/doctor', doctorAuthRoutes);
app.use('/api/doctor', doctorRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Radiant Skincare Backend API',
    timestamp: new Date().toISOString(),
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/', (req, res) => {
  res.json({ message: '🌟 Radiant Skincare API is running' });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Centralized Error Handling Middleware (no stack traces in production)
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Socket.IO Handler
require('./sockets/chatSocket')(io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful Shutdown
const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully...');
  server.close(() => {
    console.log('Closed remaining connections.');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
