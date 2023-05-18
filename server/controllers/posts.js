import mongoose from "mongoose";
import postMessage from "./../models/posts.js";
import user from "../models/user.js";
export const getPosts = async (req, res) => {
  const { groupid: q } = req.query;
  if (q) {
    if (!mongoose.Types.ObjectId.isValid(q)) {
      return res.status(404).json("Not a valid id");
    }
    try {
      const posts = await postMessage.find({ groups: q });
      return res.status(200).json(posts);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      console.log("in server");
      const posts = await postMessage.find({
        creator: req.userId,
        groups: [],
      });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
    }
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const { groupid: q } = req.query;
  let newPost;
  if (q) {
    newPost = new postMessage({
      ...post,
      groups: [q],
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
  } else {
    newPost = new postMessage({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
  }

  try {
    console.log(newPost);
    await newPost.save();
    res.status(201).json(newPost);
    console.log("Saved in database");
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Not a valid id");
  try {
    const updatedPost = await postMessage.findByIdAndUpdate(
      _id,
      { ...post, lastEdited: new Date().toISOString() },
      {
        new: true,
      }
    );
    console.log(updatedPost._id);
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  const { groupid: q } = req.query;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ error: "Not a valid id" });
  const post = await postMessage.findById(_id);
  if (post.creator !== req.userId) {
    return res
      .status(403)
      .json({ error: "You can not delete this post only creator can do this" });
  }
  try {
    if (q) {
      if (post.groups.length > 0) {
        await postMessage.findByIdAndUpdate(
          _id,
          { $pull: { groups: q } },
          { new: true }
        );
        return res.status(200).json("Memory removed successfully");
      } else {
        await postMessage.findByIdAndDelete(_id);
        res.json({ message: "the data is successfully deleted" });
      }
    } else {
      await postMessage.deleteOne({ _id: _id });
      res.json({ message: "the data is successfully deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const sharePost = async (req, res) => {
  const { id: _id } = req.params;
  const shareData = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Not a valid Id");
  }
  try {
    const existingUser = await user.findOne({ email: shareData.email }).exec();
    if (!existingUser) {
      return res.status(404).json({ error: "User not found with this email" });
    }
    const post = await postMessage.findById(_id);
    if (post.creator !== req.userId) {
      return res
        .status(403)
        .send({ error: "Only creator can share this resource" });
    }
    if (shareData.access === 1) {
      const updatedPost = await postMessage.findByIdAndUpdate(
        _id,
        { $push: { editors: existingUser?._id } },
        { new: true }
      );
      return res.status(200).json(updatedPost);
    } else {
      const updatedPost = await postMessage.findByIdAndUpdate(
        _id,
        { $push: { viewers: existingUser?._id } },
        { new: true }
      );
      return res.status(200).json(updatedPost);
    }
  } catch (err) {
    console.log(err);
  }
};
