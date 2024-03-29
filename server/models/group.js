import mongoose from "mongoose";
const groupSchema = mongoose.Schema({
  name: String,
  description: String,
  creator: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  members: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  access: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
});
const group = mongoose.model("groups", groupSchema);
export default group;
