const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://0.0.0.0:27017/test`, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected Successfully.`);
  } catch (error) {
    console.error("ERROR ::::::::::::::: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;