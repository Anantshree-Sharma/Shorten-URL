import express from "express";
import dbConnect from "./dbConnect.js";
import urlRouter from "./routes/url.route.js";
import shortUrlRouter from "./routes/shortUrl.route.js";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import jwtAuth from "./middlewares/jwtAuth.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const origin =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT
    : "http://localhost:5173";

app.use(cookieParser());
app.use(
  cors({
    origin,
    credentials: true,
  })
);
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRouter);
app.use(shortUrlRouter);
app.use(jwtAuth);
app.use("/api/url", urlRouter);

const PORT = process.env.PORT;
dbConnect();
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
