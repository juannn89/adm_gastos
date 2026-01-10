// Importa el framework Express
const express = require("express");

// Crea un router para agrupar rutas relacionadas con gastos
const router = express.Router();

// Importa el controlador que contiene la lógica de los gastos
const gastosController = require("../controllers/gastos.controller");

// Ruta GET /gastos
// Llama al método obtenerGastos del controlador
// Se usa para listar todos los gastos
router.get("/", gastosController.obtenerGastos);
// Se usa para lista los gastos por ID
router.get("/:id", gastosController.obtenerGastoPorId);

// Ruta POST /gastos
// Llama al método crearGasto del controlador
// Se usa para crear un nuevo gasto
router.post("/", gastosController.crearGasto);

// Ruta PUT /gastos/:id
// Llama al método actualizarGasto del controlador
// Se usa para actualizar un gasto existente por su ID
router.put("/:id", gastosController.actualizarGasto);

// Ruta DELETE /gastos/:id
// Llama al método eliminarGasto del controlador
// Se usa para eliminar un gasto por su ID
router.delete("/:id", gastosController.eliminarGasto);

// Exporta el router para poder usarlo en app.js
module.exports = router;
