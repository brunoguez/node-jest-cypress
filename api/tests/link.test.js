const request = require("supertest");
const app = require("../server.js");

describe("Testando API de Liks", () => {
  test("Deve listar todos os Liks", async () => {
    const res = await request(app).get("/links");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Deve criar um novo link", async () => {
    const link = {
      url: `https://novolink-${Math.random().toString().slice(2)}`,
      id: 1,
    };

    const res = await request(app).post("/link").send(link);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("url", link.url);
    expect(res.body).toHaveProperty("id_usuario", link.id);
    expect(res.body).toHaveProperty("url_encurtada");
    expect(res.body).toHaveProperty("id");
  });

  test("Deve listar todos os links de determinado usuário", async () => {
    const resTodos = await request(app).get("/links");
    const groupByUser = resTodos.body.reduce((anterior, atual) => {
      if (!(atual.id_usuario in anterior)) anterior[atual.id_usuario] = [];
      anterior[atual.id_usuario].push(atual);
      return anterior;
    }, {});
    const indexIdUsuario =
      parseInt(Math.random().toString().slice(2)) % (resTodos.body.length - 1);
    const idUsuario = resTodos.body[indexIdUsuario].id_usuario;
    const countLinks = groupByUser[idUsuario].length;

    const res = await request(app).get("/linksByUser/" + idUsuario);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(countLinks);

    for (const link of res.body) {
      expect(link.id_usuario).toBe(idUsuario);
    }
  });

  test("Deve retornar um link", async () => {
    const resTodos = await request(app).get("/links");
    const indexLink =
      parseInt(Math.random().toString().slice(2)) % (resTodos.body.length - 1);
    const link = resTodos.body[indexLink];
    const res = await request(app).get("/link/" + link.id);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("url", link.url);
    expect(res.body).toHaveProperty("id_usuario", link.id_usuario);
    expect(res.body).toHaveProperty("url_encurtada", link.url_encurtada);
    expect(res.body).toHaveProperty("id", link.id);
  });

  test("Deve deletar um link", async () => {
    const resTodos = await request(app).get("/links");
    const indexLink =
      parseInt(Math.random().toString().slice(2)) % (resTodos.body.length - 1);
    const link = resTodos.body[indexLink];
    const res = await request(app).delete("/link/" + link.id);
    expect(res.statusCode).toBe(200);

    const resTodosAposDelete = await request(app).get("/links");
    const anyLink = resTodosAposDelete.body.some(({ id }) => id === link.id);
    expect(anyLink).toBe(false);
  });
});
