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