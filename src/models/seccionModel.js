const { sql, poolPromise } = require('../config/db');

// Obtener todas las secciones
const getSecciones = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Secciones');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener una sección por ID
const getSeccionById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Secciones WHERE SeccionId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear una nueva sección
const createSeccion = async (nombre, descripcion, formularioId, fechaCreacion, creadorSeccion, activo) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('descripcion', sql.NVarChar, descripcion)
      .input('formularioId', sql.Int, formularioId)
      .input('fechaCreacion', sql.Date, fechaCreacion)
      .input('creadorSeccion', sql.NVarChar, creadorSeccion)
      .input('activo', sql.Bit, activo)
      .query('INSERT INTO Secciones (Nombre, Descripcion, FormularioId, FechaCreacion, CreadorSeccion, Activo) VALUES (@nombre, @descripcion, @formularioId, @fechaCreacion,@creadorSeccion, @activo); SELECT SCOPE_IDENTITY() AS SeccionId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar una sección existente
const updateSeccion = async (id,nombre, descripcion, formularioId, fechaCreacion, creadorSeccion, activo) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('ID', sql.Int, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('descripcion', sql.NVarChar, descripcion)
      .input('formularioId', sql.Int, formularioId)
      .input('fechaCreacion', sql.Date, fechaCreacion)
      .input('creadorSeccion', sql.NVarChar, creadorSeccion)
      .input('activo', sql.Bit, activo)
      .query('UPDATE Seccion SET SeccionId = @id, Nombre = @nombre Descripcion = @descripcion, FormularioId = @formularioId, FechaCreacion = @fechaCreacion, CreadorSeccion = @creadorSeccion, Activo = @activo WHERE SeccionId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar una sección
const deleteSeccion = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Secciones WHERE SeccionId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSecciones,
  getSeccionById,
  createSeccion,
  updateSeccion,
  deleteSeccion
};
