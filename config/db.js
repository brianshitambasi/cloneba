const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    // Don't exit the process, just log the error
    console.log('⚠️ Will retry connection...');
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('❌ MongoDB disconnected!');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected!');
});

module.exports = connectDB;
