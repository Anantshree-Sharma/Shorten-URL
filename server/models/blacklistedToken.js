import mongoose from "mongoose";

const blacklistedTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 86400,
  },
});

const BlacklistedToken = mongoose.model(
  "BlacklistedToken",
  blacklistedTokenSchema
);

export default BlacklistedToken;
