import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true, index: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);
UserSchema.methods.setPassword = async function (password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};
UserSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};
export default mongoose.model("User", UserSchema);
