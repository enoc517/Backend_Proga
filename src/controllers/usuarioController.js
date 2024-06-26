const usuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();


// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioModel.getUsuarioById(id);
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener un usuario por correo y contraseña
const getUsuarioByCorreo = async (req, res) => {
  try {
    const { correo, contrasenna } = req.body;
    const usuario = await usuarioModel.verifyUsuario(correo, contrasenna);
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }
    // Firmar un token
    const token = jwt.sign({ id: usuario.UsuarioId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ usuario, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  try {
    const { nombre, apellido, fechaNacimiento, correo, contrasenna, rolId } = req.body;
    const newUsuario = await usuarioModel.createUsuario(nombre, apellido, fechaNacimiento, correo, contrasenna, rolId);
    // Firmar un token
    const token = jwt.sign({ id: newUsuario.UsuarioId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ newUsuario, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Actualizar un usuario existente
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, fechaNacimiento, correo, contrasenna, rolId } = req.body;
    // Encriptar la nueva contraseña si se proporciona
    let contrasennaEncriptada = contrasenna;
    if (contrasenna) {
      const salt = await bcrypt.genSalt(10);
      contrasennaEncriptada = await bcrypt.hash(contrasenna, salt);
    }
    await usuarioModel.updateUsuario(id, nombre, apellido, fechaNacimiento, correo, contrasennaEncriptada, rolId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await usuarioModel.deleteUsuario(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  getUsuarioByCorreo,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
