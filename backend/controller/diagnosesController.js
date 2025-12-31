import DiagnosesList from "../models/DiagnosesList.js";

export default function diagnosesRoutes(app) {
  // Create
  app.post("/api/diagnoses", async (req, res) => {
    try {
      const { name, code, status } = req.body;
      const diagnosis = await DiagnosesList.create({ name, code, status });
      res.json(diagnosis);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get All
  app.get("/api/diagnoses", async (req, res) => {
    try {
      const diagnoses = await DiagnosesList.findAll();
      res.json(diagnoses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update
  app.put("/api/diagnoses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, code, status } = req.body;
      const diagnosis = await DiagnosesList.findByPk(id);
      if (!diagnosis) return res.status(404).json({ error: "Not found" });

      await diagnosis.update({ name, code, status });
      res.json(diagnosis);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete
  app.delete("/api/diagnoses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const diagnosis = await DiagnosesList.findByPk(id);
      if (!diagnosis) return res.status(404).json({ error: "Not found" });

      await diagnosis.destroy();
      res.json({ message: "Diagnosis deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
