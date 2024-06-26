const { sql, poolPromise } = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Obtener todos los usuarios
const getUsuarios = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Usuarios');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Usuarios WHERE UsuarioId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Verificar la contraseña de un usuario
const verifyUsuario = async (correo, contrasenna) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('correo', sql.NVarChar, correo)
      .query('SELECT * FROM Usuario WHERE Correo = @correo');
    const usuario = result.recordset[0];
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    const contrasennaValida = await bcrypt.compare(contrasenna, usuario.Contrasenna);
    if (!contrasennaValida) {
      throw new Error('Contraseña incorrecta');
    }
    return usuario;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo usuario
const createUsuario = async (nombre, apellido, fechaNacimiento, correo, contrasenna, rolId) => {
  try {
    const pool = await poolPromise;
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasennaEncriptada = await bcrypt.hash(contrasenna, salt);
    const result = await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('apellido', sql.NVarChar, apellido)
      .input('fechaNacimiento',sql.Date,fechaNacimiento)
      .input('correo', sql.NVarChar, correo)
      .input('contrasenna', sql.NVarChar, contrasennaEncriptada) // Usar la contraseña encriptada
      .input('rolId', sql.Int, rolId)
      .query('INSERT INTO Usuarios (Nombre, Apellido, FechaNacimiento, Correo, Contrasenna, RolId) VALUES (@nombre, @apellido, @fechaNacimiento, @correo, @contrasenna, @rolId); SELECT SCOPE_IDENTITY() AS UsuarioId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};


// Actualizar un usuario existente
const updateUsuario = async (id, nombre, apellido, fechaNacimiento, correo, contrasenna, rolId) => {
  try {
    const pool = await poolPromise;
    // Encriptar la nueva contraseña si se proporciona
    let contrasennaEncriptada = contrasenna;
    if (contrasenna) {
      const salt = await bcrypt.genSalt(10);
      contrasennaEncriptada = await bcrypt.hash(contrasenna, salt);
    }
    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('apellido', sql.NVarChar, apellido)
      .input('fechaNacimiento',sql.Date,fechaNacimiento)
      .input('correo', sql.NVarChar, correo)
      .input('contrasenna', sql.NVarChar, contrasennaEncriptada) // Usar la nueva contraseña encriptada
      .input('rolId', sql.Int, rolId)
      .query('UPDATE Usuarios SET Nombre = @nombre, Apellido = @apellido, FechaNacimiento = @fechaNacimiento, Correo = @correo, Contrasenna = @contrasenna, RolId = @rolId WHERE UsuarioId = @id');
  } catch (error) {
    throw error;
  }
};


// Eliminar un usuario
const deleteUsuario = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Usuarios WHERE UsuarioId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  verifyUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
