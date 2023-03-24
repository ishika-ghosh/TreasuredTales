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
  viewers: [String],
  editors: [String],
});
const postMessage = mongoose.model("postMessage", postSchema);
export default postMessage;
