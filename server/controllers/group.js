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
  try {
    const admin = await User.findOne({ _id: req.userId });
    console.log(admin);
    const newGroup = await group.create({
      ...groupdetails,
      creator: admin,
      createdAt: new Date().toISOString(),
    });
    const createdGroup = await group
      .findOne({ _id: newGroup._id })
      .populate("members", "-password")
      .populate("creator", "-password");
    res.status(200).json(createdGroup);
  } catch (error) {
    console.log(error.message);
  }
};
export const updateGroup = async (req, res) => {
  const { id: _id } = req.id; //group id
};
export const deleteGroup = async (req, res) => {};
