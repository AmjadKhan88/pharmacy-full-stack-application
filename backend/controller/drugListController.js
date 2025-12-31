import Drug from "../models/DrugList.js";

// Create new drug
export const createDrug = async (req, res) => {
  try {
    const { name, code, status } = req.body;
    if (!name || !code) {
      return res.status(400).json({ message: "Name and code are required" });
    }

    const drug = await Drug.create({ name, code, status });
    res.status(201).json(drug);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all drugs
export const getDrugs = async (req, res) => {
  try {
    const drugs = await Drug.findAll();
    res.json(drugs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update drug
export const updateDrug = async (req, res) => {
  try {
    const { id } = req.params;
    const drug = await Drug.findByPk(id);
    if (!drug) return res.status(404).json({ message: "Drug not found" });

    await drug.update(req.body);
    res.json(drug);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete drug
export const deleteDrug = async (req, res) => {
  try {
    const { id } = req.params;
    const drug = await Drug.findByPk(id);
    if (!drug) return res.status(404).json({ message: "Drug not found" });

    await drug.destroy();
    res.json({ message: "Drug deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
