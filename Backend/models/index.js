const mongoose = require("mongoose");

async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing. Add it to Backend/.env");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

module.exports = { connectDatabase };
