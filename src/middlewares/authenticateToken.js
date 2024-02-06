/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).json({ mensaje: 'Token no proporcionado', error: true });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({
      message: 'No autenticado.',
      error: true,
    });
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Token no valido.',
        error: true,
      });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
