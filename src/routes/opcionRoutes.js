const express = require('express');
const router = express.Router();
const opcionController = require('../controllers/opcionController');

// Rutas para las opciones
router.get('/', opcionController.getOpciones);
router.get('/:id', opcionController.getOpcionById);
router.post('/', opcionController.createOpcion);
router.put('/:id', opcionController.updateOpcion);
router.delete('/:id', opcionController.deleteOpcion);

module.exports = router;
