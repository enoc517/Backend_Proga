const respuestasModel = require('../models/respuestasModel');

// Obtener todos las respuestas
const getRespuestas = async (req, res) => {
  try {
    const respuestas = await respuestasModel.getRespuestas();
    res.json(respuestas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener una Respuesta por ID
const getRespuestasById = async (req, res) => {
  try {
    const { id } = req.params;
    const respuestas = await respuestasModel.getRespuestasById(id);
    if (!respuestas) {
      return res.status(404).send('Respuesta no encontrado');
    }
    res.json(respuestas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear una nueva Respuesta
const createRespuesta = async (req, res) => {
  try {
    const { usuarioId,opcionId,respuesta,fechaRespuesta } = req.body;
    const newrespuestas = await respuestasModel.createrespuestas(usuarioId,opcionId,respuesta,fechaRespuesta);
    res.status(201).json(newrespuestas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar una Respuesta existente
const updateRespuesta = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioId,opcionId,respuesta,fechaRespuesta } = req.body;
    await respuestasModel.updaterespuestas(id, usuarioId,opcionId,respuesta,fechaRespuesta );
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar una Respuesta
const deleteRespuesta = async (req, res) => {
  try {
    const { id } = req.params;
    await respuestasModel.deleteRespuesta(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getRespuestas,
  getRespuestasById,
  createRespuesta,
  updateRespuesta,
  deleteRespuesta
};
