/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({
      message: 'No autenticado',
      error: true,
    });
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'No autorizado',
        error: true,
      });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
