const express = require('express');
const router = express.Router();
const formCompletadoController = require('../controllers/formCompletadoController');

// Rutas para los formularios completados
router.get('/', formCompletadoController.getFormulariosCompletados);
router.get('/:id', formCompletadoController.getFormCompletadoById);
router.post('/', formCompletadoController.createFormCompletado);
router.put('/:id', formCompletadoController.updateFormCompletado);
router.delete('/:id', formCompletadoController.deleteFormCompletado);

module.exports = router;
