const Usuarios = require("../models/Usuario.js");

class UsuarioController {
  async getAll(_, res) {
    const usuarios = await Usuarios.findAll();
    res.json(usuarios);
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuarios.findByPk(id);

      if (!usuario)
        return res.status(404).json({ error: "Usuário não encontrado" });

      res.json(usuario);
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async create(req, res) {
    try {
      const { nome, email } = req.body;

      if (!nome || !email)
        return res.status(400).json({ error: "Nome e email são obrigatórios" });

      const usuario = await Usuarios.create({ nome, email });

      res.status(201).json(usuario);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const usuarioFind = await Usuarios.findByPk(id);

      if (!usuarioFind)
        return res.status(404).json({ error: "Usuário não encontrado" });

      const { nome, email } = req.body;
      if (!nome || nome == usuarioFind?.dataValues.nome)
        return res.status(204).json(usuarioFind);

      if (!email || email == usuarioFind?.dataValues.email)
        return res.status(204).json(usuarioFind);

      const usuarioUpdate = await usuarioFind.update({ nome, email });

      res.status(200).json(usuarioUpdate);
    } catch (error) {
      console.error("Erro ao atualizar usuário", error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }
}
module.exports = UsuarioController;
