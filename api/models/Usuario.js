const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const moment = require("moment-timezone");

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

module.exports = Usuario;
