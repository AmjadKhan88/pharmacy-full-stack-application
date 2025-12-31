import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../models/User.js";

// Signup Controller
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(name, email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      res.status(201).json({
        message: "User registered successfully",
        user: { id: result.insertId, name, email },
      });
    });
  });
};

// Login Controller
export const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
};
