var Sequelize = require('sequelize');
var SequelizeDB = require('./database');
const Generos = require('./generos');
/*
const SendSave = () => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', selectedImage);
  
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert('Error 34 ' + error);
      });
  };*/


var filmes = SequelizeDB.define('filmes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: Sequelize.STRING,
    photo: Sequelize.STRING,
    description: Sequelize.STRING,
    generoId: {
        type: Sequelize.INTEGER,
        references: {
        model: Generos,
        key: 'id'
        }
    }
},
{
    timestamps: false,
});


filmes.belongsTo(Generos)

//filmes.sync();

module.exports = filmes;