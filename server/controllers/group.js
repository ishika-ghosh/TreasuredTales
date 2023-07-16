import mongoose from "mongoose";
import group from "../models/group.js";
import User from "./../models/user.js";
import postMessage from "./../models/posts.js";
//get all groups where you are either member or you have access to create posts
export const getAllGroups = async (req, res) => {
  try {
    const groups = await group
      .find({ $or: [{ access: req.userId }, { members: req.userId }] })
      .select("name");

    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
  }
};
//any valid user can create group
export const createGroup = async (req, res) => {
  const groupdetails = req.body;
  try {
    const newGroup = await group.create({
      ...groupdetails,
      creator: req.userId,
      createdAt: new Date().toISOString(),
      access: [req.userId],
    });

    res.status(200).json(newGroup);
  } catch (error) {
    console.log(error.message);
  }
};
//only admin can delete groups with all it's posts
export const deleteGroup = async (req, res) => {
  const { id: _id } = req.params;
  console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ error: "Not a valid id" });
  try {
    const g = await group.findById(_id);
    if (mongoose.Types.ObjectId(g.creator).equals(req.userId)) {
      // console.log("here");
      const posts = await postMessage.find({ groups: _id });
      for (const post of posts) {
        if (post.originGroup) {
          if (post.groups.length === 1) {
            await postMessage.deleteOne({ _id: post._id });
            console.log(`Post ${post._id} deleted successfully`);
          } else {
            await postMessage.findByIdAndUpdate(post._id, {
              $pull: { groups: _id },
            });
            // console.log(p);
          }
        } else {
          await postMessage.findByIdAndUpdate(post._id, {
            $pull: { groups: _id },
          });
          // console.log(p);
        }
      }
      await group.deleteOne({ _id: _id });
    }
    res.json({ message: "the group deleted is successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};
//only admin can rename the group
export const renameGroup = async (req, res) => {
  const { id: _id } = req.params;
  const { newName } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send({ message: "Invalid" });
  }
  try {
    const grp = await group.findById(_id);
    if (String(grp.creator) === req.userId) {
      const renamed = await group
        .findByIdAndUpdate(_id, { name: newName }, { new: true })
        .populate("members", "-password")
        .populate("creator", "-password");
      return res.status(200).json(renamed);
    } else {
      return res
        .status(403)
        .json({ message: "You have no access to rename this group" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//only admin can add new members
export const addtoGroup = async (req, res) => {
  const { id: _id } = req.params;
  const { memberId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send({ message: "Invalid" });
  }
  try {
    const grp = await group.findById(_id);
    if (String(grp.creator) === req.userId && !grp.members.includes(memberId)) {
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
    } else if (grp.members.includes(memberId)) {
      return res.json({ message: "This member is already there" });
    } else {
      return res
        .status(403)
        .json({ message: "You have no access to add members in this group" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).error("chat not found");
  }
};
//only admin cam remove any member from the group
export const removefromGroup = async (req, res) => {
  const { id: _id } = req.params;
  const { memberId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(memberId)) {
    return res.status(404).json({ message: "Invalid" });
  }
  try {
    const grp = await group.findById(_id);
    if (String(grp.creator) === req.userId) {
      if (grp.members.includes(memberId)) {
        if (grp.access.includes(memberId)) {
          await group.findByIdAndUpdate(_id, {
            $pull: { members: memberId },
          });
          const removed = await group
            .findByIdAndUpdate(
              _id,
              {
                $pull: { access: memberId },
              },
              { new: true }
            )
            .populate("members", "-password")
            .populate("creator", "-password");
          return res.status(200).json(removed);
        } else {
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
        }
      } else {
        return res.status(404).json({
          message: "The requested member does not belong to this group",
        });
      }
    } else {
      return res
        .status(403)
        .json({ message: "You have no access to delete this group" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).error("chat not found");
  }
};
//only the admin can give access to the valid member of the group who does not have it already
export const giveAccess = async (req, res) => {
  const { id: groupId } = req.params;
  const { memberId } = req.body;
  if (
    !mongoose.Types.ObjectId.isValid(groupId) ||
    !mongoose.Types.ObjectId.isValid(memberId)
  ) {
    return res.status(404).json({ message: "Invalid group or member" });
  }
  try {
    const grp = await group.findById(groupId);
    if (
      String(grp.creator) === req.userId &&
      grp.members.includes(memberId) &&
      !grp.access.includes(memberId)
    ) {
      const updatedGroup = await group
        .findByIdAndUpdate(
          groupId,
          {
            $push: { access: memberId },
          },
          { new: true }
        )
        .populate("members", "-password")
        .populate("creator", "-password");
      return res.status(200).json(updatedGroup);
    } else if (grp.access.includes(memberId)) {
      return res.send({ message: "The member has already access" });
    } else {
      return res.json({
        message: "Only Admin can give access to valid members",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
//Any one who is the member of the group can leave the group
export const leaveGroup = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Invalid" });
  }
  try {
    const grp = await group.findById(_id);
    if (!grp) {
      return res.status(404).json({ message: "Invalid Group" });
    }
    const posts = await postMessage.find({ groups: _id });
    for (const post of posts) {
      if (String(post.creator) === req.userId) {
        if (post.groups.length > 1) {
          await postMessage.findByIdAndUpdate(post._id, {
            $pull: { groups: _id },
          });
        } else {
          if (post.originGroup) {
            await postMessage.deleteOne({ _id: post._id });
          } else {
            await postMessage.findByIdAndUpdate(post._id, {
              $pull: { groups: _id },
            });
          }
        }
      }
    }
    if (String(grp.creator) === req.userId) {
      // console.log("here");
      await group.findByIdAndUpdate(_id, {
        $pull: { access: req.userId },
      });
      return res
        .status(200)
        .json({ message: "You Left the group Successfully" });
    }
    if (grp.members.includes(req.userId)) {
      if (grp.access.includes(req.userId)) {
        console.log(req.userId);
        await group.findByIdAndUpdate(_id, {
          $pull: { members: req.userId },
        });
        await group.findByIdAndUpdate(_id, {
          $pull: { access: req.userId },
        });

        return res
          .status(200)
          .json({ message: "You Left the group Successfully" });
      } else {
        await group.findByIdAndUpdate(_id, {
          $pull: { members: req.userId },
        });

        return res
          .status(200)
          .json({ message: "You Left the group Successfully" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Member does not belongs to this group" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//get all the details of a particular group
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
//get all groups where the user has access to share posts
export const getAllSharableGroups = async (req, res) => {
  try {
    const groups = await group.find({ access: req.userId }).select("name");
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
  }
};
