import express from "express";
import {
  addClinician,
  getClinicians,
  updateClinician,
  deleteClinician,
} from "../controller/clinicianListController.js";

const router = express.Router();

// ➕ Add
router.post("/", addClinician);

// 📌 Get all
router.get("/", getClinicians);

// ✏️ Update
router.put("/:id", updateClinician);

// ❌ Delete
router.delete("/:id", deleteClinician);

export default router;
