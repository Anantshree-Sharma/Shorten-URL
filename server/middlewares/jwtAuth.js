import { verifyToken } from "../utils/jwt.js";
import mongoose from "mongoose";
import BlacklistedToken from "../models/blacklistedToken.js";

const jwtAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = verifyToken(token);
    const id = decoded.id;
    req.user = {
      id: new mongoose.Types.ObjectId(id),
      ...decoded,
    };

    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

export default jwtAuth;
