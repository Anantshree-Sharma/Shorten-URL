import User from "../models/user.js";
import BlackListedToken from "../models/blacklistedToken.js";
import { createToken } from "../utils/jwt.js";

export async function postSignup(req, res) {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ errors: "Account already exists" });
  }
  try {
    await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json({ msg: "User created" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function postLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const payLoad = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = createToken(payLoad);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        msg: "Login successfull",
      });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Failure" });
  }
}

export async function getUser(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { id, name, email } = req.User;
  return res.json({ id, name, email });
}

export async function postLogout(req, res) {
  const token = req.cookies?.token;
  try {
    await BlackListedToken.create({ token });
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
