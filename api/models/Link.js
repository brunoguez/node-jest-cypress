const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario");
const moment = require("moment-timezone");

const Link = sequelize.define("Link", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  url_encurtada: { type: DataTypes.STRING, allowNull: false },
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

Link.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Link, { foreignKey: "id_usuario" });

module.exports = Link;
