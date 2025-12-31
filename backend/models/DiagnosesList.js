import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DiagnosesList = sequelize.define(
  "diagnoses_list",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt fields
  }
);

export default DiagnosesList;
