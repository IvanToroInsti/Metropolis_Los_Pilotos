/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */
const { Router } = require('express');
const router = Router();

// --- GESTIÓN DE USUARIOS ---
// @route   POST /user/login
// @desc    Autenticación (Entrada: {correo, contrasena} | Salida: {token, usuario})
router.post("/user/login", (req, res) => {});

// @route   GET /user/:id
// @desc    Obtener perfil (Salida: {id, nombre, telefono, correo})
router.get("/user/:id", (req, res) => {});

// @route   POST /user
// @desc    Registrar usuario (Entrada: {nombre, telefono, correo, contrasena} | Salida: {id})
router.post("/user", (req, res) => {});

// @route   PUT /user/:id
// @desc    Actualizar perfil (Entrada: {nombre, telefono} | Salida: {message})
router.put("/user/:id", (req, res) => {});


// --- GESTIÓN DE ANUNCIOS ---
// @route   GET /anuncio
// @desc    Listar todos los anuncios (Salida: [{id, titulo, descripcion, publico, autor}])
router.get("/anuncio", (req, res) => {});

// @route   POST /anuncio
// @desc    Crear anuncio (Entrada: {titulo, descripcion, prioridad, publico, id_autor} | Salida: {id})
router.post("/anuncio", (req, res) => {});

// @route   PUT /anuncio/:id
// @desc    Actualizar anuncio (Entrada: {titulo, descripcion, publico} | Salida: {message})
router.put("/anuncio/:id", (req, res) => {});

// @route   DELETE /anuncio/:id
// @desc    Eliminar anuncio (Salida: {message})
router.delete("/anuncio/:id", (req, res) => {});


// --- GESTIÓN DE PUNTOS ---
// @route   GET /punto
// @desc    Listar todos los puntos (Salida: [{id, titulo, latitud, longitud, publico}])
router.get("/punto", (req, res) => {});

// @route   POST /punto
// @desc    Crear punto (Entrada: {titulo, descripcion, latitud, longitud, publico, id_autor} | Salida: {id})
router.post("/punto", (req, res) => {});

// @route   PUT /punto/:id
// @desc    Actualizar punto (Entrada: {titulo, descripcion, latitud, longitud, publico} | Salida: {message})
router.put("/punto/:id", (req, res) => {});

// @route   DELETE /punto/:id
// @desc    Eliminar punto (Salida: {message})
router.delete("/punto/:id", (req, res) => {});


// --- GESTIÓN DE ROLES ---
// @route   GET /rol
// @desc    Listar roles (Salida: [{id, titulo, prioridad}])
router.get("/rol", (req, res) => {});

// @route   POST /user/:id/rol
// @desc    Asignar rol a usuario (Entrada: {id_rol} | Salida: {message})
router.post("/user/:id/rol", (req, res) => {});

module.exports = { router };