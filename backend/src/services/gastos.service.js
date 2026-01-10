// Importa la conexión (pool) a la base de datos MySQL
const db = require("../config/database");

// Obtiene todos los gastos de la base de datos
exports.obtenerTodos = async () => {
  // Ejecuta una consulta SELECT
  // rows contiene los registros obtenidos
  const [rows] = await db.query(
    "SELECT * FROM gastos ORDER BY fecha DESC"
  );

  // Devuelve los gastos al controller
  return rows;
};

// Obtiene un gasto por su ID
exports.obtenerPorId = async (id) => {
  // Ejecuta una consulta SELECT con un placeholder para el ID
  const [rows] = await db.query(
    "SELECT * FROM gastos WHERE id = ?",
    [id]
  ); 
  // Devuelve el primer gasto encontrado o null si no existe
  return rows[0] || null;
};

// Crea un nuevo gasto en la base de datos
exports.crear = async (data) => {
  // Extrae los campos necesarios del objeto recibido
  const { descripcion, monto, categoria, fecha } = data;

  // Ejecuta la consulta INSERT usando placeholders
  // para evitar inyección SQL
  const [result] = await db.query(
    `INSERT INTO gastos (descripcion, monto, categoria, fecha)
     VALUES (?, ?, ?, ?)`,
    [descripcion, monto, categoria, fecha]
  );

  // Retorna el gasto creado con el ID generado por MySQL
  return {
    id: result.insertId,
    descripcion,
    monto,
    categoria,
    fecha,
  };
};

// Actualiza un gasto existente en la base de datos
exports.actualizar = async (id, data) => {
  // Extrae los campos necesarios del objeto recibido
  const [result] = await db.query(
    `UPDATE gastos 
    SET ? 
    WHERE id = ?`,
    [data, id]
  );
  // Valida si se actualizó algún registro
  if (result.affectedRows === 0) return null; // No se encontró el gasto para actualizar
  // Retorna el gasto actualizado
  return { id, ...data };
};

// Elimina un gasto de la base de datos por su ID
exports.eliminar = async (id) => {
  // Ejecuta la consulta DELETE con un placeholder para el ID
  const [result] = await db.query(
    "DELETE FROM gastos WHERE id = ?",
    [id]
  );
  // Retorna true si se eliminó algún registro, false si no
  return result.affectedRows > 0;
};