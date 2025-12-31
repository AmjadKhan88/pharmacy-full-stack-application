// controller/clinicianController.js
import Clinician from "../models/Clinician.js";

// ➕ Add Clinician
export const addClinician = async (req, res) => {
  try {
    const clinician = await Clinician.create(req.body);
    res.status(201).json(clinician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Get all Clinicians
export const getClinicians = async (req, res) => {
  try {
    const clinicians = await Clinician.findAll();
    res.status(200).json(clinicians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update Clinician
export const updateClinician = async (req, res) => {
  try {
    const { id } = req.params;
    await Clinician.update(req.body, { where: { id } });
    res.status(200).json({ message: "Clinician updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Clinician
export const deleteClinician = async (req, res) => {
  try {
    const { id } = req.params;
    await Clinician.destroy({ where: { id } });
    res.status(200).json({ message: "Clinician deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
