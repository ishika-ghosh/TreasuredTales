import mongoose from "mongoose";
import postMessage from "../models/posts.js";
import User from "../models/user.js";

const isFavourite = (posts, user) => {
  return posts.map((post) =>
    post.addToFavouriteBy.includes(user)
      ? { ...post._doc, isFavourite: true }
      : { ...post._doc, isFavourite: false }
  );
};
export const getAllSharedPosts = async (req, res) => {
  try {
    const posts = await postMessage
      .find({
        $and: [
          { $or: [{ editor: req.userId }, { viewer: req.userId }] },
          { creator: { $ne: req.userId } },
        ],
      })
      .populate({
        path: "creator",
        model: "user",
        select: "-password",
      })
      .populate({
        path: "editDetails.editedBy",
        model: "user",
        select: "-password",
      });
    const x = isFavourite(posts, req.userId);
    return res.status(200).json(x);
  } catch (error) {
    console.log(error);
  }
};

export const addOrRemoveFavourite = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Invalid object" });
  }
  try {
    const post = await postMessage.findById(_id);
    let updated;
    if (post.addToFavouriteBy.includes(req.userId)) {
      updated = await postMessage
        .findByIdAndUpdate(
          _id,
          {
            $pull: { addToFavouriteBy: req.userId },
          },
          { new: true }
        )
        .populate({
          path: "creator",
          model: "user",
          select: "-password",
        })
        .populate({
          path: "editDetails.editedBy",
          model: "user",
          select: "-password",
        });
      return res.status(200).json({ ...updated._doc, isFavourite: false });
    } else {
      updated = await postMessage
        .findByIdAndUpdate(
          _id,
          {
            $push: { addToFavouriteBy: req.userId },
          },
          { new: true }
        )
        .populate({
          path: "creator",
          model: "user",
          select: "-password",
        })
        .populate({
          path: "editDetails.editedBy",
          model: "user",
          select: "-password",
        });
      return res.status(200).json({ ...updated._doc, isFavourite: true });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllEditorAccessPosts = async (req, res) => {
  try {
    let posts = await postMessage
      .find({
        $and: [
          {
            editor: req.userId,
          },
          {
            creator: { $ne: req.userId },
          },
        ],
      })
      .populate({
        path: "creator",
        model: "user",
        select: "-password",
      })
      .populate({
        path: "editDetails.editedBy",
        model: "user",
        select: "-password",
      });
    posts = isFavourite(posts, req.userId);
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};
export const getAllViewerAccessPosts = async (req, res) => {
  try {
    let posts = await postMessage
      .find({
        $and: [
          {
            viewer: req.userId,
          },
          {
            creator: { $ne: req.userId },
          },
        ],
      })
      .populate({
        path: "creator",
        model: "user",
        select: "-password",
      })
      .populate({
        path: "editDetails.editedBy",
        model: "user",
        select: "-password",
      });
    posts = isFavourite(posts, req.userId);
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};
