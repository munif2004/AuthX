import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// 🔹 Signup
export const signup = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Check if user exists
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const user = new User({
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 2 * 60 * 1000, // 2 min
      passwordHistory: [hashedPassword]
    });

    await user.save();
    res.json({ message: "User registered. Verify OTP.", otp }); // OTP returned for testing
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, phone, otp } = req.body;

    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Login
export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;

    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    // ✅ create reset link
    const resetLink = `http://localhost:5176/reset-password?token=${resetToken}`;

    // Normally you’d send email with resetLink
    res.json({
      message: "Password reset link generated",
      resetLink,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // Accept token from body OR query
    const token = req.body.token || req.query.token;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Prevent reusing last 2 passwords
    for (let oldHash of user.passwordHistory.slice(-2)) {
      if (await bcrypt.compare(newPassword, oldHash)) {
        return res.status(400).json({ message: "Cannot reuse last 2 passwords" });
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.passwordHistory.push(hashedPassword);
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
