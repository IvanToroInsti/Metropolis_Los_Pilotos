const { Router } = require("express");
const { sign } = require("./jwt");
const { query } = require("../db_conn/mariadb");

const router = Router();
const bcrypt = require("bcrypt");
const { verify_token } = require("./verify_token");
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
router.get("/:id", verify_token, async (req, res) => {
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
router.put("/:id", verify_token, async (req, res) => {
  const { nombre, telefono } = req.body;

  if (!nombre && !telefono) {
    return res.status(400).json({
      message: "No se ha recibido ningun parámetro a actualizar",
    });
  }

  const user = await query(
    "SELECT * FROM usuario WHERE id_usuario=?",
    req.params.id,
  );

  if (user.length === 0) {
    return res.status(404).json({
      message: "No se ha encontrado el usuario",
    });
  }

  const result = await query(
    "UPDATE usuario SET nombre=?, telefono=? WHERE id_usuario=?",
    [nombre ?? user[0].nombre, telefono ?? user[0].telefono, req.params.id],
  );

  res.json({
    message: "Perfil actualizado correctamente",
    datos_recibidos:
      process.env.NODE_ENV === "development" ? req.body : undefined,
  });
});

// @route   DELETE /user/:id
// @desc    Eliminar usuario perfil (Salida: {message})
router.delete("/:id", verify_token, async (req, res) => {
  const user = await query(
    "SELECT * FROM usuario WHERE id_usuario=?",
    req.params.id,
  );

  if (user.length === 0) {
    return res.status(404).json({
      message: "No se ha encontrado el usuario",
    });
  }

  const result = await query("DELETE FROM usuario WHERE id_usuario=?", [
    req.params.id,
  ]);

  res.json({
    message: "Usuario eliminado correctamente",
    datos_recibidos: req.body,
  });
});

// @route   POST /user/:id/rol
// @desc    Asignar un rol a un usuario (Relación N:M)
router.post("/:id/rol", async (req, res) => {
  const id_usuario = req.params.id;
  const { id_rol } = req.body;

  if (!id_rol) {
    return res.status(400).json({ message: "El id_rol es obligatorio" });
  }

  try {
    // 1. Validar que el rol existe en la tabla 'rol'
    const roleExists = await query("SELECT id_rol FROM rol WHERE id_rol = ?", [
      id_rol,
    ]);
    if (roleExists.length === 0) {
      return res.status(404).json({ message: "El rol especificado no existe" });
    }

    // 2. Validar que el usuario existe
    const userExists = await query(
      "SELECT id_usuario FROM usuario WHERE id_usuario = ?",
      [id_usuario],
    );
    if (userExists.length === 0) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    // 3. Validar si ya tiene ese rol (para evitar duplicados)
    const alreadyHasRole = await query(
      "SELECT * FROM user_rol WHERE id_user = ? AND id_rol = ?",
      [id_usuario, id_rol],
    );
    if (alreadyHasRole.length > 0) {
      return res
        .status(400)
        .json({ message: "El usuario ya tiene asignado este rol" });
    }

    // 4. Insertar en la tabla intermedia
    await query("INSERT INTO user_rol (id_user, id_rol) VALUES (?, ?)", [
      id_usuario,
      id_rol,
    ]);

    res.json({ message: "Rol asignado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al asignar el rol" });
  }
});

// @route   DELETE /user/:id/rol
// @desc    Eliminar un rol específico de un usuario
router.delete("/:id/rol", async (req, res) => {
  const id_usuario = req.params.id;
  const { id_rol } = req.body; // Se pasa el ID del rol a quitar en el body

  if (!id_rol) {
    return res
      .status(400)
      .json({ message: "Debes especificar el id_rol a eliminar" });
  }

  try {
    const del = await query(
      "DELETE FROM user_rol WHERE id_user = ? AND id_rol = ?",
      [id_usuario, id_rol],
    );

    if (del.affectedRows === 0) {
      return res.status(404).json({
        message: "No se encontró la relación entre el usuario y el rol",
      });
    }

    res.json({ message: "Rol quitado del usuario correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el rol" });
  }
});

// @route   PUT /user/:id/rol
// @desc    Actualizar un rol (Cambiar un rol viejo por uno nuevo)
router.put("/:id/rol", async (req, res) => {
  const id_usuario = req.params.id;
  const { id_rol_viejo, id_rol_nuevo } = req.body;

  if (!id_rol_viejo || !id_rol_nuevo) {
    return res
      .status(400)
      .json({ message: "Se requiere id_rol_viejo e id_rol_nuevo" });
  }

  try {
    // Verificar que el nuevo rol existe
    const roleExists = await query("SELECT id_rol FROM rol WHERE id_rol = ?", [
      id_rol_nuevo,
    ]);
    if (roleExists.length === 0) {
      return res.status(404).json({ message: "El nuevo rol no existe" });
    }

    const result = await query(
      "UPDATE user_rol SET id_rol = ? WHERE id_user = ? AND id_rol = ?",
      [id_rol_nuevo, id_usuario, id_rol_viejo],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "No se pudo actualizar: el usuario no tenía el rol antiguo",
      });
    }

    res.json({ message: "Rol actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el rol" });
  }
});

module.exports = { user_router: router };
