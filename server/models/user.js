import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  role: { type: String, default: "user" },
});

export default mongoose.model("User", userSchema);
