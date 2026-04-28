require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { router } = require("./routes/router");
//const logger = require('pino');

const ENVIRONMENT = process.env.NODE_ENV || "development";
const ADDRESS = process.env.ADDRESS || "127.0.0.1";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", router);

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: `La ruta ${req.originalUrl} no existe en este servidor.`,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: "Ocurrió un error en el servidor",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

app.listen(PORT, ADDRESS, () => {
  console.log(`Server funcionando en http://${ADDRESS}:${PORT}`);
});
