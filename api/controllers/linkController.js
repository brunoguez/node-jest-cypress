const { randomUUID } = require("crypto");
const Link = require("../models/Link");
const Usuario = require("../models/Usuario");
const moment = require("moment-timezone");

class LinkController {
  async getAll(_, res) {
    const links = await Link.findAll();
    res.json(links);
  }

  async getById(req, res) {
    const { id } = req.params;
    const link = await Link.findByPk(id);

    if (!link) return res.status(404).json({ error: "Link não encontrado" });
    res.json(link);
  }

  async getByUserId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario)
        return res.status(404).json({ error: "Usuário não encontrado" });

      const listLinks = await Link.findAll({
        where: {
          id_usuario: id,
        },
      });
      res.json(listLinks);
    } catch (error) {
      console.error("Erro ao buscar links por ID do usuário:", error);
      res.status(500).json({ error: "Erro ao buscar links por ID do usuário" });
    }
  }

  async create(req, res) {
    try {
      const { url, id: id_usuario } = req.body;

      if (!url || !id_usuario)
        return res
          .status(400)
          .json({ error: "URL original e usuário são obrigatórios" });

      const usuario = await Usuario.findByPk(id_usuario);

      if (!usuario)
        return res.status(404).json({ error: "Usuário não encontrado" });

      const url_encurtada = `https://encurtador-superior-${randomUUID()}`;

      const novoLink = await Link.create({ url, id_usuario, url_encurtada });
      res.json(novoLink);
    } catch (error) {
      console.error("Erro ao criar link:", error);
      res.status(500).json({ error: "Erro ao criar link" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Link.destroy({
        where: { id },
      });

      if (deleted === 0) {
        return res.status(404).json({ error: "Link não encontrado" });
      }

      return res.status(200).json({ message: "Link excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir link", error);
      return res.status(500).json({ error: "Erro ao excluir link" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const link = await Link.findByPk(id);

      if (!link) return res.status(404).json({ error: "Link não encontrado" });

      const { url, url_encurtada } = req.body;

      const forUpdate = {};

      if ("url" in req.body) forUpdate.url = url;
      if ("url_encurtada" in req.body) forUpdate.url_encurtada = url_encurtada;

      await link.update({
        ...forUpdate,
        updatedAt: moment().format(),
      });
      res.json(link);
    } catch (error) {
      console.error("Erro ao atualizar link", error);
      return res.status(500).json({ error: "Erro ao atualizar link" });
    }
  }
}

module.exports = LinkController;
