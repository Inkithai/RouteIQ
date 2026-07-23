const mongoose = require("mongoose");

const connectDb = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn("⚠️ MONGO_URI not set. Running in offline/fallback database mode.");
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      autoIndex: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error?.message || error}`);
  }
};

module.exports = connectDb;
