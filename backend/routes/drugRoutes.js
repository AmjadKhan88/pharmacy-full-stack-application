    import express from "express";
    import {
    createDrug,
    getDrugs,
    getDrugById,
    updateDrug,
    deleteDrug,
    } from "../controller/drugsController.js";

    const router = express.Router();

    router.post("/", createDrug);
    router.get("/", getDrugs);
    router.get("/:id", getDrugById);
    router.put("/:id", updateDrug);
    router.delete("/:id", deleteDrug);

    export default router;
