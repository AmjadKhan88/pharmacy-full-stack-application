import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import Clinician from "./models/Clinician.js";
import clinicianListRoutes from "./routes/clinicianListRoutes.js";
import diagnosesRoutes from "./controller/diagnosesController.js";
import drugRoutes from "./routes/drugRoutes.js";
import drugListRoutes from "./routes/drugListRoutes.js";
import drugTableRoutes from "./routes/drugTableRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import payerRoutes from "./routes/payerRoutes.js";
import authRoutes from "./routes/authRoutes.js";


import {
  addClinician,
  getClinicians,
  updateClinician,
  deleteClinician,
} from "./controller/clinicianController.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
diagnosesRoutes(app);

// ✅ API Routes
app.get("/",(req,res)=> res.send("Server is running"))
app.post("/api/clinicians", addClinician);
app.get("/api/clinicians", getClinicians);
app.put("/api/clinicians/:id", updateClinician);
app.delete("/api/clinicians/:id", deleteClinician);

app.use("/api/clinician-list", clinicianListRoutes);
app.use("/api/diagnoses-list", diagnosesRoutes);
app.use("/api/drugs", drugRoutes);
app.use("/api/drugs_list", drugListRoutes);
app.use("/api/drugTable", drugTableRoutes);
app.use("/api/pharmacies", pharmacyRoutes);
app.use("/api/payers", payerRoutes);
app.use("/api/auth", authRoutes);

// ✅ DB Sync & Server Start
sequelize.sync().then(() => {
  console.log("Database Connected ✅");
  app.listen(5000, () => console.log("Server running on port 5000 🚀"));
});
