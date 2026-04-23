const { Router } = require("express");

const router = Router();
// --- GESTIÓN DE ANUNCIOS ---
// @route   GET /anuncio
// @desc    Listar todos los anuncios (Salida: [{id, titulo, descripcion, publico, autor}])
router.get("/", (req, res) => {
  //   const {} = req.body;

  res.json([
    {
      id: 1,
      titulo: "Reunión de pilotos",
      descripcion: "Reunión mensual este sábado",
      publico: true,
      autor: "Juan Pérez",
    },
  ]);
});

// @route   POST /anuncio
// @desc    Crear anuncio (Entrada: {titulo, descripcion, prioridad, publico, id_autor} | Salida: {id})
router.post("/", (req, res) => {
  const { titulo, descripcion, prioridad, publico, id_autor } = req.body;

  res.json({
    id: 1,
  });
});

// @route   PUT /anuncio/:id
// @desc    Actualizar anuncio (Entrada: {titulo, descripcion, publico} | Salida: {message})
router.put("/:id", (req, res) => {
  const { titulo, descripcion, publico } = req.body;

  res.json({
    message: "Anuncio actualizado correctamente",
  });
});

// @route   DELETE /anuncio/:id
// @desc    Eliminar anuncio (Salida: {message})
router.delete("/:id", (req, res) => {
  res.json({
    message: "Anuncio eliminado correctamente",
  });
});

module.exports = { anuncio_router: router };
