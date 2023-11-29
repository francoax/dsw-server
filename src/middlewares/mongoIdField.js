import mongoose from 'mongoose';

const verifyMongoId = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: 'ID invalido',
      data: id,
      error: true,
    });
  }

  next();
};

export default verifyMongoId;
