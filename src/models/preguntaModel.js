const { sql, poolPromise } = require('../config/db');

// Obtener todas las preguntas
const getPreguntas = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Preguntas');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener una pregunta por ID
const getPreguntaById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Preguntas WHERE PreguntaId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear una nueva pregunta
const createPregunta = async (enunciado, seccionId, fechaCreacion,creadorPregunta,activo) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('enunciado', sql.NVarChar, enunciado)
      .input('seccionId', sql.Int, seccionId)
      .input('fechaCreacion', sql.Date, fechaCreacion)
      .input('creadorPregunta', sql.NVarChar, creadorPregunta)
      .input('activo', sql.Bit, activo)
      .query('INSERT INTO Preguntas (Enunciado, SeccionId, FechaCreacion,CreadorPregunta,Activo) VALUES (@enunciado, @seccionId, @fechaCreacion,@creadorPregunta,@activo); SELECT SCOPE_IDENTITY() AS PreguntaId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar una pregunta existente
const updatePregunta = async (id, enunciado, seccionId, fechaCreacion,creadorPregunta,activo) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('enunciado', sql.NVarChar, enunciado)
      .input('seccionId', sql.Int, seccionId)
      .input('fechaCreacion', sql.Date, fechaCreacion)
      .input('creadorPregunta', sql.NVarChar, creadorPregunta)
      .input('activo', sql.Bit, activo)
      .query('UPDATE Preguntas SET Enunciado = @enunciado, SeccionId = @seccionId, FechaCreacion = @fechaCreacion, CreadorPregunta = @creadorPregunta,Activo = @activo WHERE PreguntaId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar una pregunta
const deletePregunta = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Preguntas WHERE PreguntaId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPreguntas,
  getPreguntaById,
  createPregunta,
  updatePregunta,
  deletePregunta
};
