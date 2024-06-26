const express = require('express');
const router = express.Router();
const respuestasController = require('../controllers/respuestasController');

// Rutas para las opciones
router.get('/', respuestasController.getRespuestas);
router.get('/:id', respuestasController.getRespuestasById);
router.post('/', respuestasController.createRespuesta);
router.put('/:id', respuestasController.updateRespuesta);
router.delete('/:id', respuestasController.deleteRespuesta);

module.exports = router;
