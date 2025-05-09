import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

// Simula __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto para o arquivo SQLite dentro da pasta `api`
const storagePath = path.resolve(__dirname, "..", "encurtador-link.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: false,
  logQueryParameters: false,
});

export default sequelize;
