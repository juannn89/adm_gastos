// Importa el service de gastos (lógica de negocio y DB)
const gastosService = require("../services/gastos.service");

// Controlador para obtener todos los gastos
// Se ejecuta con GET /gastos
exports.obtenerGastos = async (req, res, next) => {
  try {
    // Llama al service para obtener todos los gastos
    const gastos = await gastosService.obtenerTodos();

    // Devuelve la lista de gastos en formato JSON
    res.json(gastos);
  } catch (error) {
    // Envía el error al middleware global de errores
    next(error);
  }
};

// Controlador para crear un nuevo gasto
// Se ejecuta con POST /gastos
exports.crearGasto = async (req, res, next) => {
  try {
    // Envía los datos del body al service para crear el gasto
    const gasto = await gastosService.crear(req.body);

    // Responde con status 201 (creado) y el gasto generado
    res.status(201).json(gasto);
  } catch (error) {
    // Manejo centralizado de errores
    next(error);
  }
};