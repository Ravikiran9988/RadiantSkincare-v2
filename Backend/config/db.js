const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/radiantskincare');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ DB Connection Failed: ${err.message}`);
    // Non-fatal error log for dev resiliency
  }
};

module.exports = connectDB;
