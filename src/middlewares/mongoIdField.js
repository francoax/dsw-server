import mongoose from 'mongoose';

const verifyMongoId = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID invalido',
      data: id,
      error: true,
    });
  }

  return next();
};

export default verifyMongoId;
