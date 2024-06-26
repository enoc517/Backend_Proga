const express = require('express');
const router = express.Router();
const seccionController = require('../controllers/seccionController');

// Rutas para las secciones
router.get('/', seccionController.getSecciones);
router.get('/:id', seccionController.getSeccionById);
router.post('/', seccionController.createSeccion);
router.put('/:id', seccionController.updateSeccion);
router.delete('/:id', seccionController.deleteSeccion);

module.exports = router;
