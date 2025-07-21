import express from "express";
import signupValidation from "../validators/signup.validator.js";
import {
  postSignup,
  postLogin,
  postLogout,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/api/signup", signupValidation, postSignup);
authRouter.post("/api/login", postLogin);
authRouter.post("/api/logout", postLogout);

export default authRouter;
