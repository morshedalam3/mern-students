import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  stdName: { type: String, required: true },
  stdAge: { type: String, required: true },
  stdSchool: { type: String, required: true },
  stdClass: { type: String, required: true },
  stdDivision: { type: String, required: true },
  stdStatus: { type: String, required: true },
});

export default mongoose.model("students", userSchema);
