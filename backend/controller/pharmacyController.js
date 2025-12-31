import Pharmacy from "../models/pharmacyModel.js";

// ✅ Create pharmacy
export const createPharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.create(req.body);
    res.status(201).json(pharmacy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all pharmacies
export const getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.findAll();
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update pharmacy
export const updatePharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByPk(req.params.id);
    if (!pharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }
    await pharmacy.update(req.body);
    res.json(pharmacy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete pharmacy
export const deletePharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByPk(req.params.id);
    if (!pharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }
    await pharmacy.destroy();
    res.json({ message: "Pharmacy deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
