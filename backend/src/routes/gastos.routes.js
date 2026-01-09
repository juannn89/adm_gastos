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

// Ruta POST /gastos
// Llama al método crearGasto del controlador
// Se usa para crear un nuevo gasto
router.post("/", gastosController.crearGasto);

// Exporta el router para poder usarlo en app.js
module.exports = router;
