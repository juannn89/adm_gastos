const { z } = require("zod");

const gastoSchema = z.object({
  descripcion: z
    .string({ required_error: "La descripción es obligatoria" })
    .min(3, "La descripción debe tener al menos 3 caracteres"),

  monto: z
    .number({ required_error: "El monto es obligatorio" })
    .positive("El monto debe ser mayor a 0"),

  categoria: z
    .string({ required_error: "La categoría es obligatoria" })
    .min(1, "La categoría es obligatoria"),

  fecha: z
    .string({ required_error: "La fecha es obligatoria" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
});

module.exports = {
  gastoSchema,
};
