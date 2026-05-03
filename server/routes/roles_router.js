const { Router } = require("express");
const { query } = require("../db_conn/mariadb");

const router = Router();

// --- GESTIÓN DE ROLES ---

// @route   GET /rol
// @desc    Listar todos los roles
router.get("/", async (req, res) => {
  try {
    const results = await query("SELECT * FROM rol");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los roles" });
  }
});

// @route   POST /rol
// @desc    Crear un nuevo rol (Entrada: {titulo, prioridad})
router.post("/", async (req, res) => {
  const { titulo, prioridad } = req.body;

  if (!titulo) {
    return res.status(400).json({
      message: "El título es obligatorio para crear un rol",
    });
  }

  try {
    const consulta = await query(
      "INSERT INTO rol (titulo, prioridad) VALUES (?, ?)",
      [titulo, prioridad ?? 100], // Prioridad por defecto 100 según tu SQL
    );

    res.json({
      id: parseInt(consulta.insertId),
      message: "Rol creado con éxito",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el rol" });
  }
});

// @route   PUT /rol/:id
// @desc    Actualizar un rol (Entrada: {titulo, prioridad})
router.put("/:id", async (req, res) => {
  const { titulo, prioridad } = req.body;
  const { id } = req.params;

  try {
    // Verificar si el rol existe
    const exists = await query("SELECT * FROM rol WHERE id_rol = ?", [id]);

    if (exists.length === 0) {
      return res.status(404).json({ message: "No se ha encontrado el rol" });
    }

    if (!titulo && prioridad === undefined) {
      return res.status(400).json({ message: "Faltan datos para actualizar" });
    }

    await query("UPDATE rol SET titulo = ?, prioridad = ? WHERE id_rol = ?", [
      titulo ?? exists[0].titulo,
      prioridad ?? exists[0].prioridad,
      id,
    ]);

    res.json({ message: "Rol actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el rol" });
  }
});

// @route   DELETE /rol/:id
// @desc    Eliminar un rol
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Verificar si el rol existe
    const exists = await query("SELECT * FROM rol WHERE id_rol = ?", [id]);

    if (exists.length === 0) {
      return res.status(404).json({ message: "No se ha encontrado el rol" });
    }

    // 2. Opcional: Verificar si hay usuarios asociados a este rol antes de borrar
    const linkedUsers = await query("SELECT * FROM user_rol WHERE id_rol = ?", [
      id,
    ]);
    if (linkedUsers.length > 0) {
      return res.status(400).json({
        message: "No se puede eliminar el rol porque tiene usuarios asociados",
      });
    }

    const del = await query("DELETE FROM rol WHERE id_rol = ?", [id]);

    if (del.affectedRows === 0) {
      return res
        .status(500)
        .json({ message: "No se ha podido eliminar el rol" });
    }

    res.json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al intentar eliminar el rol" });
  }
});

module.exports = { roles_router: router };
