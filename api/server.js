const express = require("express");
const app = express();

const path = require("path");
const LinkController = require("./controllers/linkController");
const UsuarioController = require("./controllers/usuarioController");

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
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

module.exports = app;
