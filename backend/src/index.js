const express = require("express");
require("dotenv").config();
const db = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// test DB
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Conectado a MySQL correctamente");
    connection.release();
  } catch (error) {
    console.error("Error conectando a MySQL:", error.message);
  }
})();

app.get("/", (req, res) => {
  res.json({ mensaje: "API de gastos con MySQL funcionando 🚀" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
