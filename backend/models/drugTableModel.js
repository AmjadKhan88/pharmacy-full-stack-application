import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DrugTable = sequelize.define(
  "drugTable",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ndcCode: { type: DataTypes.STRING, allowNull: false },
    haCode: { type: DataTypes.STRING, allowNull: false },
    tradeName: { type: DataTypes.STRING, allowNull: false },
    manufacturer: { type: DataTypes.STRING },
    localAgent: { type: DataTypes.STRING },
    dosageForm: { type: DataTypes.STRING },
    granularUnit: { type: DataTypes.STRING },
    unitType: { type: DataTypes.STRING },
    activeIngredients: { type: DataTypes.STRING },
    strengths: { type: DataTypes.STRING },
    startDate: { type: DataTypes.DATEONLY },
    endDate: { type: DataTypes.DATEONLY },
    packageType: { type: DataTypes.STRING },
    packageSize: { type: DataTypes.STRING },
    dispensedQuantity: { type: DataTypes.STRING },
    daysOfSupply: { type: DataTypes.STRING },
    instructions: { type: DataTypes.TEXT },
  },
  {
    tableName: "drugTable", 
    timestamps: true,
  }
);

export default DrugTable;
