function authenticateRole(roles) {
  return (req, res, next) => {
    const { user } = req;

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: 'No esta autorizado para realizar dicha accion.',
        error: true,
      });
    }

    return next();
  };
}

export default authenticateRole;
