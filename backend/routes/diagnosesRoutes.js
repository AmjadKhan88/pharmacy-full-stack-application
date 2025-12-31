// routes/diagnosesRoutes.js
import express from "express";
import {
  createDiagnosis,
  getDiagnoses,
  getDiagnosisById,
  updateDiagnosis,
  deleteDiagnosis
} from "../controller/diagnosesController.js";

const router = express.Router();

router.post("/", createDiagnosis);
router.get("/", getDiagnoses);
router.get("/:id", getDiagnosisById);
router.put("/:id", updateDiagnosis);
router.delete("/:id", deleteDiagnosis);

export default router;
