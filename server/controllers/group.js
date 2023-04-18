import mongoose from "mongoose";
import group from "../models/group.js";
import User from "./../models/user.js";

export const getAllGroups = async (req, res) => {
  try {
    const groups = await group
      .find({ $or: [{ creator: req.userId }, { members: req.userId }] })
      .populate("members", ["name", "email"]);
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
  }
};
export const createGroup = async (req, res) => {
  const groupdetails = req.body;
  for (let index = 0; index < groupdetails.members.length; index++) {
    const element = groupdetails.members[index];
    console.log(element);
    if (!(await User.exists({ email: element }))) {
      return res.status(404).json({ error: `No email found with ${element}` });
    }
  }
  try {
    const userIds = await User.find({
      email: { $in: groupdetails.members },
    }).select("_id");
    console.log(userIds);

    const newGroup = await group.create({
      ...groupdetails,
      creator: req.userId,
      createdAt: new Date().toISOString(),
      members: userIds,
    });
    const createdGroup = await group
      .find({ _id: newGroup._id })
      .populate("members", ["name", "email"]);
    res.status(200).json(createdGroup);
  } catch (error) {
    console.log(error.message);
  }
};
export const updateGroup = async (req, res) => {
  const { id: _id } = req.id; //group id
};
export const deleteGroup = async (req, res) => {};
