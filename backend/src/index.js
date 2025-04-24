import express from "express";
import cors from "cors";
import connectDB from "./DB/db.js";
import { app } from "./app.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import socketHandel from "./sockethandel.js";
dotenv.config();
import redisConn from "./redis/redis.js"

console.log(`I am getting in the answer of ${process.env.PORT}`);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    creadentials: true,
  },
});
socketHandel(io)

app.use(cors());

app.use(express.json());

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("MongoDB connected successfully ✅");

    // Connect to Redis
    await redisConn.redisConn();
    console.log("Redis connected successfully ✅");

    // Start server only after successful connections
    server.listen(process.env.PORT || 4000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT || 4000}`);
    });
  } catch (err) {
    console.error("Error in server initialization:", err.message);
    process.exit(1); // Stop the server if connections fail
  }
};

startServer();
