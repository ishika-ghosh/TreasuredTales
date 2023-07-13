import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  tags: [String],
  selectedFile: String,
  creator: String,
  editDetails: {
    editedAt: { type: Date, default: null },
    editedBy: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  groups: [{ type: mongoose.SchemaTypes.ObjectId, ref: "groups" }],
  likedBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  addToFavouriteBy: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  editor: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  viewer: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  originGroup: { type: mongoose.SchemaTypes.ObjectId, ref: "group" },
});

const postMessage = mongoose.model("postMessage", postSchema);
export default postMessage;
