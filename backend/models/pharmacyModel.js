import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Pharmacy = sequelize.define("Pharmacy", {
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  PharmacyName: { type: DataTypes.STRING, allowNull: false },
  Email: { type: DataTypes.STRING, allowNull: false },
  Address: { type: DataTypes.STRING, allowNull: false },
  ContactInfo: { type: DataTypes.STRING, allowNull: false },
  HealthAuthority: { type: DataTypes.STRING, allowNull: false },
});

export default Pharmacy;
