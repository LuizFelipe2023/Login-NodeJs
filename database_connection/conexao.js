import { Sequelize } from 'sequelize';

const conn = new Sequelize('login', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    (async () => {
        await conn.authenticate();
        console.log("Conexão feita com sucesso");
    })();
} catch (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err);
}

export default conn;
