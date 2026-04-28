const { Router } = require("express");
const { sign } = require("./jwt");
const { query } = require("../db_conn/mariadb");

const router = Router();
const bcrypt = require("bcrypt");
const saltsRound = 10;

// --- GESTIÓN DE USUARIOS ---
// @route   POST /user/login
// @desc    Autenticación (Entrada: {correo, contrasena} | Salida: {token, usuario})
router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  let busqueda = await query("SELECT * FROM usuario WHERE correo=?", [correo]);

  if (busqueda.length === 0) {
    return res.status(404).json({
      message: "Correo o contraseña inválida",
      datos_recibidos:
        process.env.NODE_ENV === "development" ? req.body : undefined,
    });
  }

  const user = busqueda[0];

  const exists = await bcrypt.compare(contrasena, user.contrasena);

  if (!exists) {
    return res.status(404).json({
      message: "Correo o contraseña inválida",
      datos_recibidos:
        process.env.NODE_ENV === "development" ? req.body : undefined,
    });
  }

  const token = sign({ id_usuario: parseInt(user.id_usuario) });

  res.json({
    token: token,
    usuario: {
      id: user.id_usuario,
      nombre: user.nombre,
      correo: user.correo,
      // roles: ["editor"],
    },
    datos_recibidos: req?.body || undefined,
  });
});

// @route   GET /user/:id
// @desc    Obtener perfil (Salida: {id, nombre, telefono, correo})
router.get("/:id", async (req, res) => {
  const busqueda = await query("SELECT * from usuario WHERE id_usuario=?", [
    req.params.id,
  ]);

  if (busqueda.length === 0) {
    return res.status(404).json({
      message: "No se ha encontrado el usuario.",
    });
  }

  const user = busqueda[0];

  res.json({
    id: user.id_usuario,
    nombre: user.nombre,
    telefono: user.telefono,
    correo: user.correo,
    datos_recibidos:
      process.env.NODE_ENV === "development" ? req.body : undefined,
  });
});

// @route   POST /user
// @desc    Registrar usuario (Entrada: {nombre, telefono, correo, contrasena} | Salida: {id})
router.post("/", async (req, res) => {
  const { nombre, telefono, correo, contrasena } = req.body;

  if (!nombre || !telefono || !correo) {
    return res.status(400).json({
      message: "Faltan datos mínimos",
    });
  }

  const passwordHash = await bcrypt.hash(contrasena, saltsRound);

  const consulta = await query(
    "INSERT INTO usuario(nombre, telefono, correo, contrasena) VALUES (?, ?, ?, ?)",
    [nombre, telefono, correo, passwordHash],
  );

  const token = sign({ id_usuario: parseInt(consulta.insertId) });

  res.json({
    token: token,
    datos_recibidos: req.body,
  });
});

// @route   PUT /user/:id
// @desc    Actualizar perfil (Entrada: {nombre, telefono} | Salida: {message})
router.put("/:id", (req, res) => {
  const { nombre, telefono } = req.body;

  res.json({
    message: "Perfil actualizado correctamente",
    datos_recibidos:
      process.env.NODE_ENV === "development" ? req.body : undefined,
  });
});

// @route   DELETE /user/:id
// @desc    Eliminar usuario perfil (Salida: {message})
router.delete("/:id", (req, res) => {
  res.json({
    message: "Usuario eliminado correctamente",
    datos_recibidos: req.body,
  });
});

// @route   POST /user/:id/rol
// @desc    Asignar rol a usuario (Entrada: {id_rol} | Salida: {message})
router.post("/:id/rol", (req, res) => {
  const { id_rol } = req.body;

  res.json({
    message: "Rol asignado correctamente",
  });
});

// @route   PUT /user/:id/rol
// @desc    Actualizar rol(Entrada: {id_rol} | Salida: {message})
router.put("/rol/:id/rol", (req, res) => {
  const { id_rol } = req.body;

  res.json({
    message: "Rol actualizado correctamente",
  });
});

// @route   POST /user/:id/rol
// @desc    Asignar rol a usuario (Entrada: {id_rol} | Salida: {message})
router.delete("/:id/rol", (req, res) => {
  res.json({
    message: "Rol eliminado correctamente",
  });
});

module.exports = { user_router: router };
