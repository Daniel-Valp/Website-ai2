const express = require('express');
const router = express.Router();

const generoController = require('../controllers/generosController');

router.post('/create', generoController.generos_create);
router.get('/list', generoController.generos_list);
router.put('/update/:id', generoController.generos_update);
router.get('/get/:id', generoController.generos_get);
router.put('/delete/:id', generoController.generos_delete);

module.exports = router;