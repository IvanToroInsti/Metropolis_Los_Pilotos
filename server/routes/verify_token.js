const { jwt, verify } = require("./jwt");

const verify_token = (req, res, next) => {
  // 1. Obtener la cabecera de autorización
  const authHeader = req.headers["authorization"];

  // 2. Verificar que la cabecera existe y empieza con 'Bearer '
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // 3. Extraer el token (quitando la palabra 'Bearer ')
    const token = authHeader.split(" ")[1];

    // 4. Verificar el token
    verify(token, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token no válido" });
      }
      // Guardamos la info del usuario en el request para usarla luego

      if (!decoded?.id_usuario) {
        return res.status(403).json({ message: "Token no válido" });
      }

      req.userID = decoded.id_usuario;
      next();
    });
  } else {
    res.status(401).json({ message: "No autorizado, falta el token" });
  }
};

module.exports = { verify_token };
