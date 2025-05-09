import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import moment from "moment-timezone";

const Usuario = sequelize.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  createdAt: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: () => moment().format(),
  },
  updatedAt: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: () => moment().format(),
  },
});

export default Usuario;
