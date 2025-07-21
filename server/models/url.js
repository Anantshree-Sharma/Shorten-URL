import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        ipAddress: String,
        clickedAt: {
          type: Date,
          default: () => new Date(),
        },
      },
    ],
    createdBy: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
