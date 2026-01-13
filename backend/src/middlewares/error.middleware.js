const { ZodError } = require("zod");

module.exports = (err, req, res, next) => {
  console.error(err);

  // Errores de validación (Zod)
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: err.issues.map(issue => issue.message),
    });
  }

  // Error genérico
  return res.status(500).json({
    error: err.message || "Error interno del servidor",
  });
};
