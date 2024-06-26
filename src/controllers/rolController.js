const { sql, poolPromise } = require('../config/db');

// Obtener todos los roles
const getRoles = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Rol');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener un rol por ID
const getRolById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Rol WHERE RolId = @id');
    const rol = result.recordset[0];
    if (!rol) {
      return res.status(404).send('Rol no encontrado');
    }
    res.json(rol);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear un nuevo rol
const createRol = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('descripcion', sql.NVarChar, descripcion)
      .query('INSERT INTO Rol (Descripcion) VALUES (@descripcion); SELECT SCOPE_IDENTITY() AS RolId');
    const newRolId = result.recordset[0].RolId;
    const newRol = { RolId: newRolId, Descripcion: descripcion };
    res.status(201).json(newRol);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un rol existente
const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('descripcion', sql.NVarChar, descripcion)
      .query('UPDATE Rol SET Descripcion = @descripcion WHERE RolId = @id');
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar un rol
const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Rol WHERE RolId = @id');
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol
};
