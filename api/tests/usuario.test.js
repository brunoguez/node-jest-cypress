const request = require("supertest");
const app = require("../server");

describe("Testando API de Usuários", () => {
  test("Deve Criar um novo usuário, retornar o id e o status 201", async () => {
    const usuario = {
      nome: `Bruno Guêz - ${Math.random().toString().slice(2)}`,
      email: `brunomguez${Math.random().toString().slice(2)}@gmail.com`,
    };

    const res = await request(app).post("/usuario").send(usuario);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("nome", usuario.nome);
    expect(res.body).toHaveProperty("email", usuario.email);
  });

  test("Deve retornar o status 400 ao tentar cadastrar um usuário sem email", async () => {
    const usuario = {
      nome: `Bruno Guêz - ${Math.random().toString().slice(2)}`,
    };

    const res = await request(app).post("/usuario").send(usuario);
    expect(res.statusCode).toBe(400);
  });

  test("Deve retornar status 200 e um usuário", async () => {
    const id = 1;
    const res = await request(app).get("/usuario/" + id);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", id);
    expect(res.body).toHaveProperty("nome");
    expect(res.body).toHaveProperty("email");
  });

  test("Deve retornar status 404 e a mensagem: 'Usuário não encontrado'", async () => {
    const id = 100000000;
    const res = await request(app).get("/usuario/" + id);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Usuário não encontrado");
  });

  test("Deve retornar status 200 e verificar se o usuário foi alterado", async () => {
    const usuario = {
      nome: `Bruno Guêz - ${Math.random().toString().slice(2)}`,
      email: `brunomguez${Math.random().toString().slice(2)}@gmail.com`,
    };

    const resCreate = await request(app).post("/usuario").send(usuario);

    resCreate.body.nome = `ALTERADOBruno Guêz - ${Math.random().toString().slice(2)}`;
    resCreate.body.email = `ALTERADObrunomguez${Math.random().toString().slice(2)}@gmail.com`;

    const res = await request(app)
      .put("/usuario/" + resCreate.body.id)
      .send(resCreate.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", resCreate.body.id);
    expect(res.body).toHaveProperty("nome", resCreate.body.nome);
    expect(res.body).toHaveProperty("email", resCreate.body.email);
  });

  test("Deve retornar status 404 e a mensagem 'Usuário não encontrado'", async () => {
    const res = await request(app)
      .put("/usuario/" + 100000000)
      .send({});
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Usuário não encontrado");
  });
});
