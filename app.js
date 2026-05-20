const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware (removed problematic express-mongo-sanitize)
app.use(helmet());
app.use(cors());

// Simple request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Import mongoose for health check
const mongoose = require('mongoose');

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API info endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'MJ&Roberts Consulting API',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      jobs: {
        list: 'GET /api/jobs',
        detail: 'GET /api/jobs/:id'
      },
      contacts: {
        submit: 'POST /api/contacts'
      },
      services: {
        list: 'GET /api/services'
      },
      projects: {
        list: 'GET /api/projects'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.url} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 3004;
const server = app.listen(PORT, () => {
  console.log(`\níº€ Server running on port ${PORT}`);
  console.log(`í³ http://localhost:${PORT}`);
  console.log(`í¼ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\nâœ… Ready to accept requests!\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

module.exports = app;
