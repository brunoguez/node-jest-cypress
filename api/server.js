import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import { LinkController } from "./controllers/linkController.js";
import { UsuarioController } from "./controllers/usuarioController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "pages")));

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "index.html"));
});

const linkController = new LinkController();
app.get("/links", linkController.getAll);
app.get("/link/:id", linkController.getById);
app.get("/linksByUser/:id", linkController.getByUserId);
app.post("/link", linkController.create);
app.delete("/link/:id", linkController.delete);
app.patch("/link/:id", linkController.update);

const usuarioController = new UsuarioController();
app.get("/usuarios", usuarioController.getAll);
app.post("/usuario", usuarioController.create);
app.get("/usuario/:id", usuarioController.getById);
app.put("/usuario/:id", usuarioController.update);

if (process.env.NODE_ENV !== "test")
  app.listen(PORT, () => console.log("Servidor rodando na porta 3000"));
// sequelize
//   .sync()
//   .then(() =>

//   );

export default app;
