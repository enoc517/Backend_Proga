const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Obtener el token de la cabecera de la solicitud
  const token = req.headers['x-access-token'];

  // Si no se proporciona un token, enviar una respuesta de error
  if (!token) {
    return res.status(403).send('Se requiere un token');
  }

  // Verificar el token con la clave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // Si la verificación falla, enviar una respuesta de error
    if (err) {
      return res.status(500).send('Falló la autenticación del token');
    }

    // Si la verificación es exitosa, guardar el ID del usuario en la solicitud y llamar a `next` para continuar con la siguiente función de middleware o la función de ruta
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
