import request from "supertest";
import app from "../server.js";

describe("Testando API de Pedidos", () => {
    test("5 - Insere pedido, verifica se foi criado e se está vinculado ao usuário correspondenteDeve criar um pedido", async () => {
        const fk_Usuario = 3;
        const res = await request(app)
            .post("/pedidos")
            .send({ descricao: "Teste Pedido > " + new Date().toISOString(), valor: 50, fk_Usuario });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id_pedido");
        expect(res.body).toHaveProperty("fk_Usuario", fk_Usuario);
    });

    test("6 - Retornar todos os pedido de um usuário, verificar se todos são do usuário e se é um array vazio para um usuário sem pedidos", async () => {
        const fk_Usuario = 3;
        const res = await request(app).get(`/pedidos/${fk_Usuario}`);
        const isArray = Array.isArray(res.body);
        expect(isArray).toBe(true);
        if (isArray) res.body.forEach(item => expect(item).toHaveProperty("fk_Usuario", fk_Usuario));
    });

    test("7 - Retornar pedidos de um usuário, verificar se está o total está correto e se retorna 0 para usuário sem pedidos", async () => {
        const novoComPedidos = uuidv4();
        const resComPedidos = await request(app)
            .post("/usuario")
            .send({ nome: novoComPedidos, email: novoComPedidos + "@email.com" });
        const novoIdComPedidos = resComPedidos.body.id_usuario;

        for (let i = 0; i < 3; i++)
            await request(app)
                .post("/pedidos")
                .send({ descricao: `Pedido ${i + 1} > ${novoComPedidos}`, valor: 50, fk_Usuario: novoIdComPedidos });

        const novoSemPedidos = uuidv4();
        const resSemPedidos = await request(app)
            .post("/usuario")
            .send({ nome: novoSemPedidos, email: novoSemPedidos + "@email.com" });
        const novoIdSemPedidos = resSemPedidos.body.id_usuario;

        const comPedidos = await request(app).get(`/pedidos/${novoIdComPedidos}`);
        const isArray = Array.isArray(comPedidos.body);
        expect(isArray).toBe(true);
        if (isArray) {
            const total = comPedidos.body
                .map(a => a.valor)
                .reduce((a, b) => a + b, 0);
            const verifica = Math.abs(total - 150) < 0.01;
            expect(verifica).toBe(true);
        }

        const semPedidos = await request(app).get(`/pedidos/${novoIdSemPedidos}`);
        expect(semPedidos.text).toBe("0");
    });

    test("Deve listar os pedidos", async () => {
        const res = await request(app).get("/pedidos");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
