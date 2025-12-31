import express from "express";
import {
  createDrug,
  getDrugs,
  updateDrug,
  deleteDrug,
} from "../controller/drugListController.js";
  
const router = express.Router();

router.post("/", createDrug);
router.get("/", getDrugs);
router.put("/:id", updateDrug);
router.delete("/:id", deleteDrug);

export default router;
