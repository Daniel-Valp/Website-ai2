const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'ai2',              // Nome do banco de dados
    'postgres',         // Nome de usuário
    'Carros35643564',       // Senha
    {
        host: 'localhost',      // Host do banco de dados
        port: '5432',           // Porta do banco de dados
        dialect: 'postgres'     // Dialeto do banco de dados
    }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('%cConexão bem-sucedida com o banco de dados', 'color: red; font-weight: bold');
    
  })
  .catch((error) => {
    console.error('%cErro ao conectar ao banco de dados', 'color: red; font-weight: bold', error);
});

sequelize.sync();


module.exports = sequelize;