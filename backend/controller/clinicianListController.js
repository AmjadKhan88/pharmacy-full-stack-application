import ClinicianList from "../models/ClinicianList.js";

// ➕ Add
export const addClinician = async (req, res) => {
  try {
    const { name, code, status } = req.body;
    if (!name || !code) {
      return res.status(400).json({ error: "Name and Code are required" });
    }
    const clinician = await ClinicianList.create({ name, code, status });
    res.status(201).json(clinician);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get All
export const getClinicians = async (req, res) => {
  try {
    const clinicians = await ClinicianList.findAll();
    res.json(clinicians);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update
export const updateClinician = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, status } = req.body;

    const clinician = await ClinicianList.findByPk(id);
    if (!clinician)
      return res.status(404).json({ error: "Clinician not found" });

    clinician.name = name || clinician.name;
    clinician.code = code || clinician.code;
    clinician.status = status || clinician.status;

    await clinician.save();
    res.json(clinician);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete
export const deleteClinician = async (req, res) => {
  try {
    const { id } = req.params;
    const clinician = await ClinicianList.findByPk(id);
    if (!clinician)
      return res.status(404).json({ error: "Clinician not found" });

    await clinician.destroy();
    res.json({ message: "Clinician deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
