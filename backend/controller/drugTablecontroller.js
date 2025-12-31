import DrugTable from "../models/drugTableModel.js";

// GET all drugs
export const getAllDrugs = async (req, res) => {
  try {
    const drugs = await DrugTable.findAll();
    res.json(drugs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single drug
export const getDrug = async (req, res) => {
  try {
    const drug = await DrugTable.findByPk(req.params.id);
    if (!drug) return res.status(404).json({ message: "Drug not found" });
    res.json(drug);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new drug
export const createDrug = async (req, res) => {
  try {
    const drug = await DrugTable.create(req.body);
    res.status(201).json(drug);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE drug
export const updateDrug = async (req, res) => {
  try {
    const drug = await DrugTable.findByPk(req.params.id);
    if (!drug) return res.status(404).json({ message: "Drug not found" });
    await drug.update(req.body);
    res.json(drug);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE drug
export const deleteDrug = async (req, res) => {
  try {
    const drug = await DrugTable.findByPk(req.params.id);
    if (!drug) return res.status(404).json({ message: "Drug not found" });
    await drug.destroy();
    res.json({ message: "Drug deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
