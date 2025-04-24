import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.PORT);
const connectDB = async () => {
  console.log(process.env.MONGODB_URI);
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 20, // default is 5; try 10-20 or higher
    });
    console.log(`Connection Successful: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
