import Drug from "../models/Drugs.js";

// ➕ Create
export const createDrug = async (req, res) => {
  try {
    const drug = await Drug.create(req.body);
    res.json(drug);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get All
export const getDrugs = async (req, res) => {
  try {
    const drugs = await Drug.findAll();
    res.json(drugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Get By ID
export const getDrugById = async (req, res) => {
  try {
    const { id } = req.params;
    const drug = await Drug.findByPk(id);
    if (!drug) return res.status(404).json({ error: "Drug not found" });
    res.json(drug);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update
export const updateDrug = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Drug.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: "Drug not found" });
    res.json({ message: "Drug updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete
export const deleteDrug = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Drug.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Drug not found" });
    res.json({ message: "Drug deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
