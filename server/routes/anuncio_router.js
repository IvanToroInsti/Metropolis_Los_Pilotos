const { Router } = require("express");
const { query } = require("../db_conn/mariadb");
const { jwt } = require("./jwt");

const router = Router();
// --- GESTIÓN DE ANUNCIOS ---
// @route   GET /anuncio
// @desc    Listar todos los anuncios (Salida: [{id, titulo, descripcion, publico, autor}])
router.get("/", async (req, res) => {
  try {
    const results = await query("SELECT * FROM anuncio");
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al obtener los anuncios" });
  }
});

// @route   POST /anuncio
// @desc    Crear anuncio (Entrada: {titulo, descripcion, prioridad, publico, id_autor} | Salida: {id})
router.post("/", async (req, res) => {
  const { titulo, descripcion, prioridad, publico, id_autor } = req.body;

  if (!titulo || !descripcion) {
    return res.status(400).json({
      message: "Faltan datos mínimos para la creación de un anuncio",
    });
  }

  try {
    const exists = await query("SELECT * FROM usuario WHERE id_usuario = ?", [
      id_autor ?? req.userID,
    ]);

    if (exists.length === 0) {
      return res.status(400).json({
        message: "No se ha encontrado el usuario creador",
      });
    }

    const consulta = await query(
      "INSERT INTO anuncio (titulo, descripcion, prioridad, publico, id_autor) VALUES (?,?,?,?,?)",
      [
        titulo,
        descripcion,
        prioridad ?? 0,
        publico ?? 0,
        id_autor ?? req.userID,
      ],
    );

    if (consulta.affectedRows === 0) {
      return res.status(500).json({
        message: "Ha ocurrido un error en el servidor",
      });
    }

    res.json({
      id: parseInt(consulta.insertId),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al crear el anuncio" });
  }
});

// @route   PUT /anuncio/:id
// @desc    Actualizar anuncio (Entrada: {titulo, descripcion, publico} | Salida: {message})
router.put("/:id", async (req, res) => {
  const { titulo, descripcion, prioridad, publico } = req.body;

  try {
    const exists = await query("SELECT * FROM anuncio WHERE id_anuncio=?", [
      req.params.id,
    ]);

    if (exists.length === 0) {
      return res.status(400).json({
        message: "No se ha encontrado el anuncio",
      });
    }

    if (!titulo && !descripcion && !prioridad && !publico) {
      return res.status(400).json({
        message: "Faltan datos mínimos para la actualización del anuncio",
      });
    }

    const result = await query(
      "UPDATE anuncio SET titulo=?, descripcion=?, prioridad=?, publico=? WHERE id_anuncio=?",
      [
        titulo ?? exists[0].titulo,
        descripcion ?? exists[0].descripcion,
        prioridad ?? exists[0].prioridad,
        publico ?? exists[0].publico,
        req.params.id,
      ],
    );

    res.json({
      message: "Anuncio actualizado correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al actualizar el anuncio" });
  }
});

// @route   DELETE /anuncio/:id
// @desc    Eliminar anuncio (Salida: {message})
router.delete("/:id", async (req, res) => {
  try {
    const exists = await query("SELECT * FROM anuncio WHERE id_anuncio=?", [
      req.params.id,
    ]);

    if (exists.length === 0) {
      return res.status(400).json({
        message: "No se ha encontrado el anuncio",
      });
    }

    const del = await query("DELETE FROM anuncio WHERE id_anuncio = ?", [
      req.params.id,
    ]);

    if (del.affectedRows === 0) {
      return res
        .status(500)
        .json({ message: "No se ha podido eliminar el anuncio" });
    }

    res.json({
      message: "Anuncio eliminado correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al eliminar el anuncio" });
  }
});

module.exports = { anuncio_router: router };
