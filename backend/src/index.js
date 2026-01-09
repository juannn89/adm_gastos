// Importa Express para crear el servidor
const express = require("express");

// Carga variables de entorno desde el archivo .env
require("dotenv").config();

// Importa la configuración de la base de datos MySQL
const db = require("./config/database");

// Importa rutas relacionadas con gastos
const gastosRoutes = require("./routes/gastos.routes");

// Importa Middleware para manejo de errores
const errorMiddleware = require("./middlewares/error.middleware");

// Inicializa la aplicación Express
const app = express();

// Define el puerto desde el .env o usa 3000 por defecto
const PORT = process.env.PORT || 3000;

// Middleware para que Express pueda leer JSON en las peticiones
app.use(express.json());

// Usa las rutas de gastos bajo el prefijo /gastos
app.use("/gastos", gastosRoutes);

// Health check básico para verificar que el servidor está activo
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Errores Middleware (debe ir al final después de las rutas)
app.use(errorMiddleware);

// Prueba de conexión a la base de datos al iniciar el servidor
(async () => {
  try {
    // Obtiene una conexión del pool
    const connection = await db.getConnection();

    // Mensaje si la conexión fue exitosa
    console.log("Conectado a MySQL correctamente");

    // Libera la conexión para que pueda ser reutilizada
    connection.release();
  } catch (error) {
    // Muestra error si la conexión falla
    console.error("Error conectando a MySQL:", error.message);
  }
})();

// Inicia el servidor en el puerto indicado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});