const { sql, poolPromise } = require('../config/db');

// Obtener todos las respuestas
const getRespuestas = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM RespuestaOpcion');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener una Respuesta por ID
const getRespuestasById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM RespuestaOpcion WHERE RespuestaId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear una nueva Respuesta
const createRespuesta = async (usuarioId,opcionId,respuesta,fechaRespuesta) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('usuarioId', sql.Int, usuarioId)
      .input('opcionId',sql.Int,opcionId)
      .input('respuesta',sql.NVarChar,respuesta)
      .input('fechaRespuesta',sql.Date,fechaRespuesta)
      .query('INSERT INTO RespuestaOpcion (UsuarioId,OpcionId,Respuesta,FechaRespuesta) VALUES (@usuarioId,@opcionId,@respuesta,@fechaRespuesta); SELECT SCOPE_IDENTITY() AS RespuestaId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar una Respuesta existente
const updateRespuesta = async (id, usuarioId,opcionId,respuesta,fechaRespuesta) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('usuarioId', sql.Int, usuarioId)
      .input('opcionId',sql.Int,opcionId)
      .input('respuesta',sql.NVarChar,respuesta)
      .input('fechaRespuesta',sql.Date,fechaRespuesta)
      .query('UPDATE RespuestaOpcion SET UsuarioId = @usuarioId,OpcionId = @opcionId,Respuesta = @respuesta, FechaRespuesta =  @fechaRespuesta WHERE RespuestaId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar una Respuesta
const deleteRespuesta = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM RespuestaOpcion WHERE RespuestaId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getRespuestas,
    getRespuestasById,
    createRespuesta,
    updateRespuesta,
    deleteRespuesta
};
