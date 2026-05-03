const { Router } = require("express");
const { query } = require("../db_conn/mariadb");

const router = Router();

// --- GESTIÓN DE PUNTOS ---
// @route   GET /punto
// @desc    Listar todos los puntos (Salida: [{id, titulo, latitud, longitud, publico}])
router.get("/", async (req, res) => {
  try {
    const points = await query("SELECT * FROM punto");

    res.json(points);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al obtener los puntos" });
  }
});

// @route   POST /punto
// @desc    Crear punto (Entrada: {titulo, descripcion, latitud, longitud, publico, id_autor} | Salida: {id})
router.post("/", async (req, res) => {
  const { titulo, descripcion, latitud, longitud, publico, id_autor } =
    req.body;

  if (!titulo || !descripcion || !latitud || !longitud || !publico) {
    return res.status(400).json({
      message: "Faltan datos para escenciales para la creacion del punto",
    });
  }

  try {
    if (id_autor !== undefined) {
      const exists = await query("SELECT * FROM usuario WHERE id_usuario = ?", [
        id_autor,
      ]);

      if (exists.length === 0) {
        return res
          .status(400)
          .json({ message: "No se ha encontrado el usuario" });
      }
    }

    const point = await query(
      "INSERT INTO punto(titulo, descripcion, latitud, longitud, publico, id_autor) VALUES (?,?,?,?,?,?)",
      [
        titulo,
        descripcion,
        latitud,
        longitud,
        publico ?? 0,
        id_autor ?? req.userID,
      ],
    );

    res.json({
      id: parseInt(point.insertId),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al registrar el punto" });
  }
});

// @route   PUT /punto/:id
// @desc    Actualizar punto (Entrada: {titulo, descripcion, latitud, longitud, publico} | Salida: {message})
router.put("/:id", async (req, res) => {
  const { titulo, descripcion, latitud, longitud, publico } = req.body;

  try {
    const exists = await query("SELECT * FROM punto WHERE id_punto=?", [
      req.params.id,
    ]);

    if (exists.length === 0) {
      return res.status(400).json({
        message: "No se ha encontrado el punto",
      });
    }

    if (!titulo && !descripcion && !latitud && !longitud && !publico) {
      return res.status(400).json({
        message: "Faltan datos mínimos para la actualización del punto",
      });
    }

    const result = await query(
      "UPDATE punto SET titulo=?, descripcion=?, latitud=?, longitud=?, publico=? WHERE id_punto=?",
      [
        titulo ?? exists[0].titulo,
        descripcion ?? exists[0].descripcion,
        latitud ?? exists[0].latitud,
        longitud ?? exists[0].longitud,
        publico ?? exists[0].publico,
        req.params.id,
      ],
    );

    res.json({
      message: "punto actualizado correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al actualizar el punto" });
  }
});

// @route   DELETE /punto/:id
// @desc    Eliminar punto (Salida: {message})
router.delete("/:id", async (req, res) => {
  try {
    const exists = await query("SELECT * FROM punto WHERE id_punto=?", [
      req.params.id,
    ]);

    if (exists.length === 0) {
      return res.status(400).json({
        message: "No se ha encontrado el punto",
      });
    }

    const del = await query("DELETE FROM punto WHERE id_punto = ?", [
      req.params.id,
    ]);

    if (del.affectedRows === 0) {
      return res
        .status(500)
        .json({ message: "No se ha podido eliminar el punto" });
    }

    res.json({
      message: "Punto eliminado correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al eliminar el punto" });
  }
});

module.exports = { punto_router: router };
