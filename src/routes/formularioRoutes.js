const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formularioController');

// Rutas para los formularios
router.get('/', formularioController.getFormularios);
router.get('/:id', formularioController.getFormularioById);
router.post('/', formularioController.createFormulario);
router.put('/:id', formularioController.updateFormulario);
router.delete('/:id', formularioController.deleteFormulario);

module.exports = router;
