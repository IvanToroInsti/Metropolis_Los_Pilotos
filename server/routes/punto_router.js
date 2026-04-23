const { Router } = require("express");

const router = Router();

// --- GESTIÓN DE PUNTOS ---
// @route   GET /punto
// @desc    Listar todos los puntos (Salida: [{id, titulo, latitud, longitud, publico}])
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      titulo: "Aeródromo Los Cerrillos",
      latitud: -33.4928,
      longitud: -70.6992,
      publico: true,
    },
  ]);
});

// @route   POST /punto
// @desc    Crear punto (Entrada: {titulo, descripcion, latitud, longitud, publico, id_autor} | Salida: {id})
router.post("/", (req, res) => {
  const { titulo, descripcion, latitud, longitud, publico, id_autor } =
    req.body;

  res.json({
    id: 1,
  });
});

// @route   PUT /punto/:id
// @desc    Actualizar punto (Entrada: {titulo, descripcion, latitud, longitud, publico} | Salida: {message})
router.put("/:id", (req, res) => {
  const { titulo, descripcion, latitud, longitud, publico } = req.body;

  res.json({
    message: "Punto actualizado correctamente",
  });
});

// @route   DELETE /punto/:id
// @desc    Eliminar punto (Salida: {message})
router.delete("/:id", (req, res) => {
  res.json({
    message: "Punto eliminado correctamente",
  });
});

module.exports = { punto_router: router };
