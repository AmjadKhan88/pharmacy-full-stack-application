import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Drug = sequelize.define(
  "drug_list",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ndcCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "drugs",
    // timestamps: true,
  }
);

export default Drug;
