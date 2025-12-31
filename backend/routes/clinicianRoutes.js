import express from "express";
import {
  createClinician,
  getClinicians,
  getClinician,
  updateClinician,
  deleteClinician,
} from "../controllers/clinicianController.js";

const router = express.Router();

router.post("/", createClinician); // ➕ Create
router.get("/", getClinicians); // 📋 Get All
router.get("/:id", getClinician); // 📌 Get One
router.put("/:id", updateClinician); // ✏️ Update
router.delete("/:id", deleteClinician); // 🗑 Delete

export default router;
