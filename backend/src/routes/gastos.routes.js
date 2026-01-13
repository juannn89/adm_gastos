// Importa el framework Express
const express = require("express");
// Crea un router para agrupar rutas relacionadas con gastos
const router = express.Router();
// Importa el controlador que contiene la lógica de los gastos
const gastosController = require("../controllers/gastos.controller");
// Importa el middleware de validación
const validate = require("../middlewares/validate.middleware");
// Importa el esquema de validación para gastos
const { gastoSchema } = require("../validators/gasto.schema");


// Ruta GET /gastos
// Llama al método obtenerGastos del controlador
// Se usa para listar todos los gastos
router.get("/", gastosController.obtenerGastos);
// Se usa para lista los gastos por ID
router.get("/:id", gastosController.obtenerGastoPorId);

// Ruta POST /gastos
// Llama al método crearGasto del controlador
// Se usa para crear un nuevo gasto, se le agregan validación de datos
router.post(
    "/", 
    validate(gastoSchema),
    gastosController.crearGasto
);

// Ruta PUT /gastos/:id
// Llama al método actualizarGasto del controlador
// Se usa para actualizar un gasto existente por su ID y se agrega validación de datos
router.put(
    "/:id", 
    validate(gastoSchema),
    gastosController.actualizarGasto
);

// Ruta DELETE /gastos/:id
// Llama al método eliminarGasto del controlador
// Se usa para eliminar un gasto por su ID
router.delete("/:id", gastosController.eliminarGasto);

// Exporta el router para poder usarlo en app.js
module.exports = router;
