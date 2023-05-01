import User from "../models/user.js";
import { mongo } from "mongoose";
export const findMembers = async (req, res) => {
  const { q } = req.query;
  if (q !== "") {
    const regex = new RegExp(q, "i");
    try {
      const data = await User.find({
        $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
      })
        .find({ _id: { $ne: req.userId } })
        .select("-password");

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error.message });
    }
  } else {
    return res.status(200).json([]);
  }
};
