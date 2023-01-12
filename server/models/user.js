import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: String,
});
const User = mongoose.model("user", userSchema);
export default User;
