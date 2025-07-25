import Url from "../models/url.js";

const handleRedirectUrl = async (req, res) => {
  const shortId = req.params.shortId;
  const ipAddress =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    null;

  try {
    const entry = await Url.findOneAndUpdate(
      { shortId },
      {
        $push: { visitHistory: { ipAddress } },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: "Url not found" });
    }

    res.status(302).redirect(entry.redirectUrl);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export default handleRedirectUrl;
