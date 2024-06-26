const { sql, poolPromise } = require('../config/db');

// Obtener todos los roles
const getRoles = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Rol');
  return result.recordset;
};

// Obtener un rol por ID
const getRolById = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Rol WHERE RolId = @id');
  return result.recordset[0];
};

// Crear un nuevo rol
const createRol = async (descripcion) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('descripcion', sql.NVarChar, descripcion)
    .query('INSERT INTO Rol (Descripcion) VALUES (@descripcion); SELECT SCOPE_IDENTITY() AS RolId');
  return result.recordset[0];
};

// Actualizar un rol existente
const updateRol = async (id, descripcion) => {
  const pool = await poolPromise;
  await pool.request()
    .input('id', sql.Int, id)
    .input('descripcion', sql.NVarChar, descripcion)
    .query('UPDATE Rol SET Descripcion = @descripcion WHERE RolId = @id');
};

// Eliminar un rol
const deleteRol = async (id) => {
  const pool = await poolPromise;
  await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Rol WHERE RolId = @id');
};

module.exports = {
  getRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol
};
