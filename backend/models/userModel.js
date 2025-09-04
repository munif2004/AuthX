import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  otp: String,
  otpExpiry: Date,
  resetToken: String,
  resetTokenExpiry: Date,
  passwordHistory: [String]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
