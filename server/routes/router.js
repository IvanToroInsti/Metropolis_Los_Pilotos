/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */
const { Router } = require("express");
const { query } = require("../db_conn/mariadb");
const { punto_router } = require("./punto_router");
const { user_router } = require("./user_router");
const { anuncio_router } = require("./anuncio_router");
const { verify_token } = require("./verify_token");
const { roles_router } = require("./roles_router");
const router = Router();

router.get("/status", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});

router.use("/user/", user_router);
router.use("/anuncio/", verify_token, anuncio_router);
router.use("/punto/", verify_token, punto_router);
router.use("/rol/", verify_token, roles_router);

module.exports = { router };
