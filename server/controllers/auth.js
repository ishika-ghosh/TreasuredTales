import mongoose from "mongoose";
import User from "./../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, "test", {
      expiresIn: "1h",
    });
    return res.status(200).json({ data: user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};
export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password does not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email: email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });
    return res.status(200).json({ data: newUser, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
