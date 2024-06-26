const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/preguntaController');

// Rutas para las preguntas
router.get('/', preguntaController.getPreguntas);
router.get('/:id', preguntaController.getPreguntaById);
router.post('/', preguntaController.createPregunta);
router.put('/:id', preguntaController.updatePregunta);
router.delete('/:id', preguntaController.deletePregunta);

module.exports = router;
