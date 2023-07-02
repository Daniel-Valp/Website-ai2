var Sequelize = require('sequelize');
var SequelizeDB = require('./database');

var Genero = SequelizeDB.define('generos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: Sequelize.STRING
},
{
    timestamps: false,
});

//Genero.sync();

module.exports = Genero