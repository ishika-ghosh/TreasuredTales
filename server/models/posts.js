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
});

const postMessage = mongoose.model("postMessage", postSchema);
export default postMessage;
