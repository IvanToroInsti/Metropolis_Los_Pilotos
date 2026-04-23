const { Router } = require("express");

const router = Router();

// --- GESTIÓN DE USUARIOS ---
// @route   POST /user/login
// @desc    Autenticación (Entrada: {correo, contrasena} | Salida: {token, usuario})
router.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  res.json({
    token: "eyJhbGciOiJIUzI1NiIs...",
    usuario: {
      id: 1,
      nombre: "usuario apellido",
      correo: "editor1@lospilotos.cat",
      roles: ["editor"],
    },
    datos_recibidos: req.body,
  });
});

// @route   GET /user/:id
// @desc    Obtener perfil (Salida: {id, nombre, telefono, correo})
router.get("/:id", (req, res) => {
  res.json({
    id: 1,
    nombre: "Juan Pérez",
    telefono: "+56 9 1234 5678",
    correo: "usuario@ejemplo.com",
    datos_recibidos: req.body,
  });
});

// @route   POST /user
// @desc    Registrar usuario (Entrada: {nombre, telefono, correo, contrasena} | Salida: {id})
router.post("/", (req, res) => {
  const { nombre, telefono, correo } = req.body;
  res.json({
    id: 1,
    datos_recibidos: req.body,
  });
});

// @route   PUT /user/:id
// @desc    Actualizar perfil (Entrada: {nombre, telefono} | Salida: {message})
router.put("/:id", (req, res) => {
  const { nombre, telefono } = req.body;

  res.json({
    message: "Perfil actualizado correctamente",
    datos_recibidos: req.body,
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
