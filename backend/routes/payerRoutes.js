import express from "express";
import Payer from "../models/PayerModel.js";

const router = express.Router();

// Get all payers
router.get("/", async (req, res) => {
  try {
    const payers = await Payer.findAll();
    res.json(payers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create payer
router.post("/", async (req, res) => {
  try {
    const { Name, Code, Status } = req.body; // ✅ Capital fields
    const payer = await Payer.create({ Name, Code, Status });
    res.status(201).json(payer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
