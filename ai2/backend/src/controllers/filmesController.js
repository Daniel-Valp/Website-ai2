var generos = require('../models/generos');
var filmes= require('../models/filmes');
var sequelize = require('../models/database');
const controllers = {}
//sequelize.sync()

controllers.filmes_create = async(req, res) => {
    const body = req.body;
    const data = await filmes.create({
        //id: id,
    ...body
    })
    .then(function(data) {
        return data
    })
    .catch(error => {
        return error;
    })

    res.status(200).json({
        success: true,
        message: "Filme adicionado!",
        data: data
    });
}

controllers.filmes_list = async(req, res) => {
    const data = await filmes.findAll({ include: [generos] })
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({ success: true, data: data });
}

controllers.filmes_update = async(req, res) => {
    const { id } = req.params;
    const { titulo, photo, description, genero } = req.body;
    const data = await filmes.update({
            titulo: titulo,
            photo: photo,
            descricao: description,
            generoId: genero
        }, {where:  { id: id}})
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    });

    res.json({success: true, data: data, message: "Filme foi atualizado com sucesso!"});
}

controllers.filmes_update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { titulo, descricao, foto, generoId } = req.body;
    // Update data
    const data = await Filmes.update(
      {
        titulo: titulo,
        descricao: descricao,
        foto: foto,
        generoId: generoId,
      },
      {
        where: { id: id },
      }
    )
      .then(function (data) {
        return data;
      })
      .catch((error) => {
        return error;
      });
    res.json({ success: true, data: data, message: "Updated successful" });
  };

controllers.filmes_delete = async(req, res) => {
    const id = req.params.id;
    const del = await filmes.destroy({ where: { id: id } })
    res.json({ success: true, deleted: del, message: "Deleted successful" });
}

controllers.filmes_get = async(req, res) => {
    const { id } = req.params;
    const data = await filmes.findAll({
        include: [generos],
        where: {id: id}
    })
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    });

    res.json({ success: true, data: data });
}

module.exports = controllers;
