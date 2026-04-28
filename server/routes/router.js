/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */
const { Router } = require("express");
const { query } = require("../db_conn/mariadb");
const { punto_router } = require("./punto_router");
const { user_router } = require("./user_router");
const { anuncio_router } = require("./anuncio_router");
const router = Router();

router.get("/status", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});

router.use("/user/", user_router);
router.use("/anuncio", anuncio_router);
router.use("/punto/", punto_router);

// --- GESTIÓN DE ROLES ---
// @route   GET /rol
// @desc    Listar roles (Salida: [{id, titulo, prioridad}])
router.get("/rol", (req, res) => {
  res.json([
    {
      id: 1,
      titulo: "Administrador",
      prioridad: 1,
    },
    {
      id: 2,
      titulo: "Cliente",
      prioridad: 50,
    },
  ]);
});

module.exports = { router };
