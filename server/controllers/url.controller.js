import { nanoid } from "nanoid";
import Url from "../models/url.js";
import { validationResult } from "express-validator";

const generateShortUrl = async (req, res) => {
  const errors = validationResult(req);
  const redirectUrl = req.body.url;
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  const shortId = nanoid(8);
  try {
    await Url.insertOne({
      shortId,
      redirectUrl,
      visitHistory: [],
      createdBy: req.user.id,
    });

    return res.status(201).json({
      message: "Short Url generated successfully",
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUrls = async (req, res) => {
  try {
    const allUrls = await Url.find({ createdBy: req.user.id });
    const analytics = allUrls.map((url) => ({
      _id: url._id,
      shortUrl: `${req.protocol}://${req.get("host")}/${url.shortId}`,
      redirectUrl: url.redirectUrl,
      clicks: url.visitHistory.length,
      createdOn: url.createdAt,
    }));
    return res.status(200).json({ analytics });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Error failure" });
  }
};

const getUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
  }
  const { id, name, email } = req.user;
  return res.json({ user: id, name, email });
};

const deleteUrl = async (req, res) => {
  const deleteId = req.params.id;
  try {
    const deleted = await Url.findByIdAndDelete(deleteId);
    if (!deleted) {
      return res.status(404).json({ error: "Url not found" });
    }
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server failure" });
  }
};

export { generateShortUrl, getAllUrls, getUser, deleteUrl };
