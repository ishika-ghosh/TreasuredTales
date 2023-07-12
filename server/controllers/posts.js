import mongoose from "mongoose";
import postMessage from "./../models/posts.js";
import User from "../models/user.js";
import group from "../models/group.js";

export const getPosts = async (req, res) => {
  const { groupid: q } = req.query;
  if (q) {
    if (!mongoose.Types.ObjectId.isValid(q)) {
      return res.status(404).json("Not a valid id");
    }
    try {
      const posts = await postMessage
        .find({ groups: q })
        .populate({
          path: "creator",
          model: "user",
          select: "name",
        })
        .populate({
          path: "editDetails.editedBy",
          model: "user",
          select: "name",
        })
        .populate("editor", "email")
        .populate("viewer", "email");

      return res.status(200).json(posts);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      console.log("in server");
      const posts = await postMessage
        .find({
          $and: [
            { creator: req.userId },
            { groups: [] },
            { editor: req.userId },
          ],
        })
        .populate({
          path: "creator",
          model: "user",
          select: "name",
        })
        .populate({
          path: "editDetails.editedBy",
          model: "user",
          select: "name",
        })
        .populate("editor", "email")
        .populate("viewer", "email");
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
    const post = await postMessage
      .findById(newPost._id)
      .populate({
        path: "creator",
        model: "user",
        select: "name",
      })
      .populate({
        path: "editDetails.editedBy",
        model: "user",
        select: "name",
      })
      .populate("editor", "email")
      .populate("viewer", "email");
    res.status(200).json(post);
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
        path: "creator",
        model: "user",
        select: "name",
      })
      .populate({
        path: "editDetails.editedBy",
        model: "user",
        select: "name",
      })
      .populate("editor", "email")
      .populate("viewer", "email");
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
      const grp = await group.findById(q);
      if (
        grp.access.includes(req.userId) &&
        String(post.creator) === req.userId
      ) {
        if (post.groups.length > 1) {
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
        return res
          .status(403)
          .json({ message: "You don't have access to delete this post" });
      }
    } else {
      if (String(post.creator) === req.userId) {
        await postMessage.deleteOne({ _id: _id });
        return res.status(200).json("The post was successfully deleted");
      } else if (post.editor.includes(req.userId)) {
        if (post.addToFavouriteBy.includes(req.userId)) {
          await postMessage.findByIdAndUpdate(_id, {
            $pull: { addToFavouriteBy: req.userId },
            $pull: { editor: req.userId },
          });
        } else {
          await postMessage.findByIdAndUpdate(_id, {
            $pull: { editor: req.userId },
          });
        }
        return res.status(200).json({ message: "Post removed successfully" });
      } else if (post.viewer.includes(req.userId)) {
        if (post.addToFavouriteBy.includes(req.userId)) {
          await postMessage.findByIdAndUpdate(_id, {
            $pull: { addToFavouriteBy: req.userId },
            $pull: { viewer: req.userId },
          });
        } else {
          await postMessage.findByIdAndUpdate(_id, {
            $pull: { viewer: req.userId },
          });
        }
        return res.status(200).json({ message: "Post removed successfully" });
      }
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
        updatedPost = await postMessage
          .findByIdAndUpdate(
            _id,
            {
              $pull: { viewer: existingUser._id },
              $push: { editor: existingUser._id },
            },

            { new: true }
          )
          .populate({
            path: "creator",
            model: "user",
            select: "name",
          })
          .populate({
            path: "editDetails.editedBy",
            model: "user",
            select: "name",
          })
          .populate("editor", "email")
          .populate("viewer", "email");
        return res.status(200).json(updatedPost);
      } else {
        updatedPost = await postMessage
          .findByIdAndUpdate(
            _id,
            {
              $push: { editor: existingUser._id },
            },
            { new: true }
          )
          .populate({
            path: "creator",
            model: "user",
            select: "name",
          })
          .populate({
            path: "editDetails.editedBy",
            model: "user",
            select: "name",
          })
          .populate("editor", "email")
          .populate("viewer", "email");
        return res.status(200).json(updatedPost);
      }
    } else {
      if (post.viewer.includes(existingUser._id)) {
        return res.json({
          message: "The post id already shared with the user",
        });
      } else {
        const updatedPost = await postMessage
          .findByIdAndUpdate(
            _id,
            {
              $push: { viewer: existingUser._id },
            },
            { new: true }
          )
          .populate({
            path: "creator",
            model: "user",
            select: "name",
          })
          .populate({
            path: "editDetails.editedBy",
            model: "user",
            select: "name",
          })
          .populate("editor", "email")
          .populate("viewer", "email");
        return res.status(200).json(updatedPost);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const likeGroupPost = async (req, res) => {
  const { groupid: q } = req.query;
  const { id: _id } = req.params;
  if (
    !mongoose.Types.ObjectId.isValid(_id) &&
    !mongoose.Types.ObjectId.isValid(q)
  )
    return res.status(404).json({ error: "Not a valid id" });
  try {
    if (q) {
      const post = await postMessage.findById(_id);
      if (post.groups.includes(q)) {
        if (post.likedBy.includes(req.userId)) {
          const updatedPost = await postMessage
            .findByIdAndUpdate(
              _id,
              {
                $pull: { likedBy: req.userId },
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
          return res.status(200).json(updatedPost);
        } else {
          const updatedPost = await postMessage
            .findByIdAndUpdate(
              _id,
              {
                $push: { likedBy: req.userId },
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
          return res.status(200).json(updatedPost);
        }
      } else {
        return res
          .status(404)
          .json({ message: "The post does not belong to this group" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
