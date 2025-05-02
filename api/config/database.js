import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./jestNode.sqlite",
  logging: true,
  logQueryParameters: true
});

export default sequelize;
