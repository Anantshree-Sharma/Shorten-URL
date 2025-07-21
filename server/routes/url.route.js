import express from "express";
import {
  generateShortUrl,
  getAllUrls,
  getUser,
  deleteUrl,
} from "../controllers/url.controller.js";
import urlVadidation from "../validators/url.validator.js";

const urlRouter = express.Router();

urlRouter.post("/", urlVadidation, generateShortUrl);
urlRouter.get("/analytics", getAllUrls);
urlRouter.delete("/analytics/delete/:id", deleteUrl);
urlRouter.get("/auth/user", getUser);

export default urlRouter;
