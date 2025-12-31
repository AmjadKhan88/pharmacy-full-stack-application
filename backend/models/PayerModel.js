import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payer = sequelize.define(
  "Payer",
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "Payers",
    timestamps: false,
  }
);

export default Payer;
