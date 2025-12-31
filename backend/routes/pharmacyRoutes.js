import express from "express";
import {
  createPharmacy,
  getPharmacies,
  updatePharmacy,
  deletePharmacy,
} from "../controller/pharmacyController.js"; // ✅ plural & .js added

const router = express.Router();

router.post("/", createPharmacy);
router.get("/", getPharmacies);
router.put("/:id", updatePharmacy);
router.delete("/:id", deletePharmacy);

export default router;
