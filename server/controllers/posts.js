import mongoose from "mongoose";
import postMessage from "./../models/posts.js";
import User from "../models/user.js";

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
        $and: [{ creator: req.userId }, { groups: [] }, { editor: req.userId }],
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
  if (!post.title || !post.selectedFile) {
    return res.json({ error: "Please select a file" });
  }
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
      editor: [req.userId],
    });
  }

  try {
    console.log(newPost);
    await newPost.save();
    res.status(200).json(newPost);
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
    const updatedPost = await postMessage
      .findByIdAndUpdate(
        _id,
        {
          ...post,
          editDetails: {
            editedAt: new Date().toISOString(),
            editedBy: req.userId,
          },
        },
        {
          new: true,
        }
      )
      .populate({
        path: "editDetails.editedBy",
        model: "user",
        select: "-password",
      });
    console.log(updatedPost);
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
      if (
        post.editor.length == 1 &&
        post.viewer.length == 0 &&
        String(post.editor[0]) == req.userId
      ) {
        await postMessage.deleteOne({ _id: _id });
      } else if (post.editor.length > 1 && post.editor.includes(req.userId)) {
        await postMessage.findByIdAndUpdate(
          _id,
          {
            $pull: { editor: req.userId },
          },
          { new: true }
        );
      } else if (post.viewer.includes(req.userId)) {
        await postMessage.findByIdAndUpdate(
          _id,
          {
            $pull: { viewer: req.userId },
          },
          { new: true }
        );
      }
      return res.json({ message: "the data is successfully deleted" });
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
  const existingUser = await User.findOne({ email: shareData.email });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }
  if (String(existingUser._id) === req.userId) {
    return res.json({ message: "You can not share with yourself" });
  }
  try {
    const post = await postMessage.findById(_id);
    if (post.editor.includes(existingUser._id)) {
      console.log("here");
      return res.json({
        message: "The post id already shared with the user",
      });
    }
    if (shareData.access === 1) {
      let updatedPost;
      if (post.viewer.includes(existingUser._id)) {
        console.log("here");
        updatedPost = await postMessage.findByIdAndUpdate(
          _id,
          {
            $pull: { viewer: existingUser._id },
            $push: { editor: existingUser._id },
          },

          { new: true }
        );
        return res.status(200).json(updatedPost);
      } else {
        updatedPost = await postMessage.findByIdAndUpdate(
          _id,
          {
            $push: { editor: existingUser._id },
          },
          { new: true }
        );
        return res.status(200).json(updatedPost);
      }
    } else {
      if (post.viewer.includes(existingUser._id)) {
        return res.json({
          message: "The post id already shared with the user",
        });
      } else {
        const updatedPost = await postMessage.findByIdAndUpdate(
          _id,
          {
            $push: { viewer: existingUser._id },
          },
          { new: true }
        );
        return res.status(200).json(updatedPost);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
