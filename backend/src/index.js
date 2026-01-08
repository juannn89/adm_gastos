const express = require("express");

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// ruta base
app.get("/", (req, res) => {
  res.json({ mensaje: "API de gastos funcionando 🚀" });
});

// health check (muy profesional)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});