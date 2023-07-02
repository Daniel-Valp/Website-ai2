var generos = require('../models/generos');
var sequelize = require('../models/database');
const controllers = {}
//sequelize.sync()

controllers.generos_create = async (req, res) => {
    const { description } = req.body;
  
    try {
      const createdGenero = await generos.create({
        description: description
      });
  
      res.status(200).json({
        success: true,
        message: "Genero criado",
        data: createdGenero
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro a criar o genero",
        error: error.message
      });
    }
  };

controllers.generos_list = async(req, res) => {
    const data = await generos.findAll()
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success: true, data: data});
}

controllers.generos_update = async(req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const data = await generos.update({
        description: description
    },{ where: { id: id}})
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    })
    res.json({ success: true, data: data, message: "O genero foi atualizado!"});
}

controllers.generos_delete = async(req, res) => {
    const { id } = req.params;
    var act = false;
    const data = await generos.destroy({
        where: {id: id}
    })
    .then(function() {
        act = true
    })
    .catch(error => {
        return error;
    })

    res.json({success: act, message: "O genero foi removido!"})
}

controllers.generos_get = async(req, res) => {
    const { id } = req.params;
    const data = await generos.findAll({
        where: { id: id }
    })
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    })
    res.json({ success: true, data: data});
}

module.exports = controllers;