const { sql, poolPromise } = require('../config/db');

// Obtener todos los formularios completados
const getFormulariosCompletados = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM FormularioCompletados');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener un formulario completado por ID
const getFormCompletadoById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM FormularioCompletados WHERE FormularioCompletadoId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo formulario completado
const createFormCompletado = async (formularioId, usuarioId, puntuacionFinal,fechaCreacion,activo,respuestaid) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('formularioId', sql.Int, formularioId)
      .input('usuarioId', sql.Int, usuarioId)
      .input('puntuacionFinal', sql.Int, puntuacionFinal)
      .input('fechaCreacion',sql.Date,fechaCreacion)
      .input('activo',sql.Bit,activo)
      .input('respuestaid',sql.Int,respuestaid)
      .query('INSERT INTO FormularioCompletado (FormularioId, UsuarioId, PuntuacionFinal, Fechacreacion, Activo, RespuestaId) VALUES ( @formularioId, @usuarioId, @puntuacionFinal, @fechaCreacion, @activo, @respuestaid); SELECT SCOPE_IDENTITY() AS FormularioCompletadoId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar un formulario completado existente
const updateFormCompletado = async (id, formularioId, usuarioId, puntuacionFinal,fechaCreacion,activo,respuestaid) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('formularioId', sql.Int, formularioId)
      .input('usuarioId', sql.Int, usuarioId)
      .input('puntuacionFinal', sql.Int, puntuacionFinal)
      .input('fechaCreacion',sql.Date,fechaCreacion)
      .input('activo',sql.Bit,activo)
      .input('respuestaid',sql.Int,respuestaid)
      .query('UPDATE FormularioCompletado SET FormularioId = @formularioId, UsuarioId = @usuarioId, PuntuacionFinal = @puntuacionFinal, Fechacreacion =  @fechaCreacion, Activo = @activo, RespuestaId = @respuestaid WHERE FormularioCompletadoId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar un formulario completado
const deleteFormCompletado = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM FormularioCompletado WHERE FormularioCompletadoId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getFormulariosCompletados,
    getFormCompletadoById,
    createFormCompletado,
    updateFormCompletado,
    deleteFormCompletado
};
  