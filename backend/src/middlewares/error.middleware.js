// Middleware global para manejo de errores en Express
// Se ejecuta cuando ocurre un error y se llama next(error)
module.exports = (err, req, res, next) => {
  // Muestra el error completo en la consola del servidor
  console.error(err);

  // Responde al cliente con un error genérico
  // Status 500 indica un error interno del servidor
  res.status(500).json({
    error: "Error interno del servidor",
  });
};