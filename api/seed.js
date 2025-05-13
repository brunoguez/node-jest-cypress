const sequelize = require("./config/database");
const Usuario = require("./models/Usuario");
const Link = require("./models/Link");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const usuarios = [];
  for (let i = 1; i <= 20; i++) {
    const user = await Usuario.create({
      nome: `Usuário ${i}`,
      email: `usuario${i}@email.com`,
    });
    usuarios.push(user);
  }

  for (let i = 1; i <= 100; i++) {
    await Link.create({
      url: `https://url-teste-encurtador-url/${i}`,
      url_encurtada: `https://url-encurtada-teste-encurtador-url/${i}`,
      id_usuario:
        usuarios[(Math.random().toString().slice(2) % 20) % usuarios.length]
          .dataValues.id,
    });
  }

  console.log("Banco populado!");
  process.exit();
};

seedDatabase();
