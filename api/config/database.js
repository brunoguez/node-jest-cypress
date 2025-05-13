const { Sequelize } = require("sequelize");
const path = require("path");

const storagePath = path.resolve(__dirname, "..", "encurtador-link.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: false,
  logQueryParameters: false,
});

module.exports = sequelize;
