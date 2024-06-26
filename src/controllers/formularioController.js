const formularioModel = require('../models/formularioModel');

// Obtener todos los formularios
const getFormularios = async (req, res) => {
  try {
    const formularios = await formularioModel.getFormularios();
    res.json(formularios);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener un formulario por ID
const getFormularioById = async (req, res) => {
  try {
    const { id } = req.params;
    const formulario = await formularioModel.getFormularioById(id);
    if (!formulario) {
      return res.status(404).send('Formulario no encontrado');
    }
    res.json(formulario);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear un nuevo formulario
const createFormulario = async (req, res) => {
  try {
    const { nombre, descripcion, fechaCreacion, creadorFormulario, activo } = req.body;
    const newFormulario = await formularioModel.createFormulario(nombre,descripcion,fechaCreacion,creadorFormulario,activo);
    res.status(201).json(newFormulario);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un formulario existente
const updateFormulario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, fechaCreacion, creadorFormulario, activo } = req.body;
    await formularioModel.updateFormulario(id, nombre,descripcion,fechaCreacion,creadorFormulario,activo);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar un formulario
const deleteFormulario = async (req, res) => {
  try {
    const { id } = req.params;
    await formularioModel.deleteFormulario(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getFormularios,
  getFormularioById,
  createFormulario,
  updateFormulario,
  deleteFormulario
};
