import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Drug = sequelize.define(
  "Drug",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
  },
  {
    tableName: "drugs_list",
    timestamps: true,
    freezeTableName: true,
  }
);

export default Drug;
