import mongoose from "mongoose";
import { UserType } from "../shared/types";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
});

// Remove password hashing from the pre-save hook
// because we are handling it manually in the reset route
const User = mongoose.model<UserType>("User", userSchema);

export default User;
