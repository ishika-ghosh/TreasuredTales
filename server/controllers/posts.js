import mongoose from "mongoose";
import postMessage from "./../models/posts.js";
export const getPosts = async (req, res) => {
  try {
    console.log("in server");
    const posts = await postMessage.find({ creator: req.userId });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new postMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
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
    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    console.log(updatedPost._id);
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ error: "Not a valid id" });
  try {
    const post = await postMessage.findById(_id);
    if (post.creator === req.userId) {
      await postMessage.deleteOne({ _id: _id });
    }
    res.json({ message: "the data is successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};
