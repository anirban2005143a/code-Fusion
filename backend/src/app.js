import express from "express";
import cors from "cors";
const app = express();
import session from "express-session";
import passport from "passport";

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

app.use(session({
  secret: 'subhambhai',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false  }
}))

app.use(passport.initialize())
app.use(passport.session())

import userRouter from "./routes/user.routes.js";
import googleAuthentication from "./auth/googleauth.js";

app.use("/api/haxplore/user",userRouter);
app.use("/auth",googleAuthentication);


app.use("/" , (req , res) => {
  res.send("Hello World");
});

console.log("done");
export { app };
