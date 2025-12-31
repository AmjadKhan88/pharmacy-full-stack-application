import Payer from "../models/PayerModel.js";

// ✅ Create new payer
export const createPayer = async (req, res) => {
  try {
    const payer = await Payer.create(req.body);
    res.status(201).json(payer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all payers
export const getPayers = async (req, res) => {
  try {
    const payers = await Payer.findAll();
    res.json(payers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single payer by ID
export const getPayerById = async (req, res) => {
  try {
    const payer = await Payer.findByPk(req.params.id);
    if (!payer) return res.status(404).json({ message: "Payer not found" });
    res.json(payer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update payer
export const updatePayer = async (req, res) => {
  try {
    const payer = await Payer.findByPk(req.params.id);
    if (!payer) return res.status(404).json({ message: "Payer not found" });

    await payer.update(req.body);
    res.json(payer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete payer
export const deletePayer = async (req, res) => {
  try {
    const payer = await Payer.findByPk(req.params.id);
    if (!payer) return res.status(404).json({ message: "Payer not found" });

    await payer.destroy();
    res.json({ message: "Payer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
