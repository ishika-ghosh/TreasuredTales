import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  tags: [String],
  creator: String,
  selectedFile: String,
  lastEdited: { type: Date, default: null },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likecount: Number,
  likedBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  viewers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  editors: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  groups: [{ type: mongoose.SchemaTypes.ObjectId, ref: "groups" }],
  comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "comments" }],
});

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});
export const comments = mongoose.model("comments", commentSchema);
const postMessage = mongoose.model("postMessage", postSchema);
export default postMessage;
