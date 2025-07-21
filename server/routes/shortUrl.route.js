import express from "express";
import handleRedirectUrl from "../controllers/shortUrl.controller.js";

const shortUrlRouter = express.Router();

shortUrlRouter.get("/:shortId", handleRedirectUrl);

export default shortUrlRouter;
