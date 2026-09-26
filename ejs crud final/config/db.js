import mongoose from "mongoose";

async function connectDB() {
  try {
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/ejs-employee"
    );

    console.log("Database connected");

    return connect;
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB;
