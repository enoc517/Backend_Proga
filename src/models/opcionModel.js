const { sql, poolPromise } = require('../config/db');

// Obtener todas las opciones
const getOpciones = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Opciones');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener una opción por ID
const getOpcionById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Opciones WHERE OpcionId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear una nueva opción
const createOpcion = async (preguntaId , respuesta, valor, activo, creadorOpcion, fechaCreacion) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('preguntaId', sql.Int, preguntaId)
      .input('respuesta', sql.NVarChar, respuesta)
      .input('valor', sql.Int, valor)
      .input('activo', sql.Bit, activo)
      .input('creadorOpcion', sql.NVarChar, creadorOpcion)
      .input('fechaCreacion', sql.Date, fechaCreacion)
      .query('INSERT INTO Opciones (Respuesta, Valor, PreguntaId) VALUES (@preguntaId , @respuesta, @valor, @activo, @creadorOpcion, @fechaCreacion); SELECT SCOPE_IDENTITY() AS OpcionId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar una opción existente
const updateOpcion = async (id, preguntaId , respuesta, valor, activo, creadorOpcion, fechaCreacion) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('preguntaId', sql.Int, preguntaId)
      .input('respuesta', sql.NVarChar, respuesta)
      .input('valor', sql.Int, valor)
      .input('activo', sql.Bit, activo)
      .input('creadorOpcion', sql.NVarChar, creadorOpcion)
      .input('fechaCreacion', sql.Date, fechaCreacion)
      .query('UPDATE Opciones SET PreguntaId = @preguntaId, Respuesta = @respuesta, Valor = @valor,Activo = @activo,CreadorOpcion = @creadorOpcion,FechaCreacion = @fechaCreacion WHERE OpcionId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar una opción
const deleteOpcion = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Opciones WHERE OpcionId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOpciones,
  getOpcionById,
  createOpcion,
  updateOpcion,
  deleteOpcion
};
