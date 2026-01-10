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

// Controlador para obtener un gasto por su ID
// Se ejecuta con GET /gastos/:id
exports.obtenerGastoPorId = async (req, res, next) => {
  try {
    // Llama al service para obtener el gasto por ID
    const gasto = await gastosService.obtenerPorId(req.params.id);
    // Si no se encuentra el gasto, responde con 404
    if (!gasto) {
      return res.status(404).json({ error: "Gasto no encontrado" });
    }
    // Devuelve el gasto encontrado en formato JSON
    res.json(gasto);
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

// Controlador para actualizar un gasto existente
// Se ejecuta con PUT /gastos/:id
exports.actualizarGasto = async (req, res, next) => {
  try {
    // Envía el ID y los datos del body al service para actualizar el gasto
    const gasto = await gastosService.actualizar(
      req.params.id,
      req.body
    );
    // Si no se encuentra el gasto, responde con 404
    if (!gasto) {
      return res.status(404).json({ error: "Gasto no encontrado" });
    }
    // Responde con el gasto actualizado en formato JSON
    res.json(gasto);
  } catch (error) {
    // Manejo centralizado de errores
    next(error);
  } 
};

// Controlador para eliminar un gasto por su ID
// Se ejecuta con DELETE /gastos/:id
exports.eliminarGasto = async (req, res, next) => {
  try {
    // Llama al service para eliminar el gasto por ID
    const eliminado = await gastosService.eliminar(req.params.id);
    // Si no se encuentra el gasto, responde con 404
    if (!eliminado) {
      return res.status(404).json({ error: "Gasto no encontrado" });
    }
    // Responde al gasto eliminado con un mensaje de éxito
    res.json({ message: "Gasto eliminado correctamente" });
  } catch (error) {
    // Envía el error al middleware global de errores
    next(error);
  }
};