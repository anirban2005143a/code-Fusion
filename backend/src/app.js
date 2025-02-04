import express from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "100kb",
  })
);
import userRouter from "./routes/user.routes.js";
app.use("/api/haxplore/user",userRouter);
console.log("done");
export { app };
