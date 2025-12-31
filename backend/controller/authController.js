import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ✅ Register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existUser = await User.findOne({ where: { email } });
    if (existUser)
      return res.status(400).json({ message: "Email already exists" });

    const image = req.file ? req.file.filename : '';
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      image,
    });
    const token = generateToken(newUser.id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        image: `/uploads/${newUser.image}`,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user.id);
    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, email: user.email, image: `/uploads/${user.image}` },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username,password } = req.body;
    const image = req.file ? req.file.filename : user.image;

    const hashedPassword = await bcrypt.hash(password,10);

    await user.update({ username: username || user.username, image, password: hashedPassword || user.password });

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        image: `/uploads/${user.image}`,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get user profile info
export const getProfileInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      message: "User profile fetched successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        image: `/uploads/${user.image}`,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Logout
export const logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};
