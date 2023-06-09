import mongoose from "mongoose";
import group from "../models/group.js";
import User from "./../models/user.js";
import postMessage from "./../models/posts.js";

export const getAllGroups = async (req, res) => {
  try {
    const groups = await group
      .find({ $or: [{ creator: req.userId }, { members: req.userId }] })
      .select("name");

    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
  }
};
export const createGroup = async (req, res) => {
  const groupdetails = req.body;
  try {
    const admin = await User.findOne({ _id: req.userId });
    const newGroup = await group.create({
      ...groupdetails,
      creator: admin,
      createdAt: new Date().toISOString(),
    });
    const createdGroup = await group
      .findOne({ _id: newGroup._id })
      .select("name");
    res.status(200).json(createdGroup);
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteGroup = async (req, res) => {
  const { id: _id } = req.params;
  console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ error: "Not a valid id" });
  try {
    const g = await group.findById(_id);
    if (mongoose.Types.ObjectId(g.creator).equals(req.userId)) {
      console.log("here");
      const posts = await postMessage.find({ groups: _id });
      for (const post of posts) {
        if (post.groups.length === 1) {
          await postMessage.deleteOne({ _id: post._id });
          console.log(`Post ${post._id} deleted successfully`);
        } else {
          const p = await postMessage.findByIdAndUpdate(post._id, {
            $pull: { groups: _id },
          });
          console.log(p);
        }
      }
      await group.deleteOne({ _id: _id });
    }
    res.json({ message: "the group deleted is successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};
export const renameGroup = async (req, res) => {
  const { id: _id } = req.params;
  const { newName } = req.body;
  try {
    const renamed = await group
      .findByIdAndUpdate(_id, { name: newName }, { new: true })
      .populate("members", "-password")
      .populate("creator", "-password");
    return res.status(200).json(renamed);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const addtoGroup = async (req, res) => {
  const { id: _id } = req.params;
  const { memberId } = req.body;
  try {
    const added = await group
      .findByIdAndUpdate(
        _id,
        {
          $push: { members: memberId },
        },
        { new: true }
      )
      .populate("members", "-password")
      .populate("creator", "-password");
    return res.status(200).json(added);
  } catch (error) {
    console.log(error);
    return res.status(404).error("chat not found");
  }
};
export const removefromGroup = async (req, res) => {
  const { id: _id } = req.params;
  const { memberId } = req.body;
  try {
    const removed = await group
      .findByIdAndUpdate(
        _id,
        {
          $pull: { members: memberId },
        },
        { new: true }
      )
      .populate("members", "-password")
      .populate("creator", "-password");
    return res.status(200).json(removed);
  } catch (error) {
    console.log(error);
    return res.status(404).error("chat not found");
  }
};
export const transferownershipofGroup = async (req, res) => {
  const { id: _id } = req.params;

  const { memberId } = req.body;
  console.log(memberId);
  try {
    const updatedGroup = await group
      .findByIdAndUpdate(
        _id,
        {
          $and: [{ $pull: { members: memberId } }, { creator: memberId }],
        },
        { new: true }
      )
      .populate("members", "-password")
      .populate("creator", "-password");
    console.log(updatedGroup);
    return res.status(200).json(updatedGroup);
  } catch (error) {
    console.log(error);
  }
};

export const getGroupDetails = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json("This is not a valid object id");
  }
  try {
    const groupDetails = await group
      .findById(_id)
      .populate("members", "-password")
      .populate("creator", "-password");

    return res.status(200).json(groupDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong!!");
  }
};
