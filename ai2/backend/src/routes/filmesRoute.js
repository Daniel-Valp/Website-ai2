const express = require('express');
const router = express.Router();

const filmesController = require('../controllers/filmesController');

router.post('/create', filmesController.filmes_create);
router.get('/list', filmesController.filmes_list);
router.put('/update/:id', filmesController.filmes_update);
router.get('/get/:id', filmesController.filmes_get);
router.get('/delete/:id', filmesController.filmes_delete);
router.get('/', filmesController.filmes_list);

module.exports = router;