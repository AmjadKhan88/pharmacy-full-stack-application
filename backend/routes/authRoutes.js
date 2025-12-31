import express from "express";
import { register, login, logout, getProfileInfo, updateProfile } from "../controller/authController.js";
import { upload } from "../config/multer.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register",upload.single('image'), register);
router.post("/login", login);
router.get("/profile",protect , getProfileInfo);
router.put("/update",protect, upload.single('image'), updateProfile);
router.post("/logout", logout);

export default router;
