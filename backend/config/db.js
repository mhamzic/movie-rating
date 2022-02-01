const mongoose = require("mongoose");
const config = require("../config/config");

const { MONGO } = config;

const connectDB = async () => {
  console.log("connecting");
  try {
    const conn = await mongoose.connect(MONGO);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;