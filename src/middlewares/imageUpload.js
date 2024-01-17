import multer from 'multer';

const storage = multer.memoryStorage();

const multerInitilizer = multer({
  storage,
  limits: {
    fileSize: 2500000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Por favor, suba un archivo de imagen valido'));
    }
    return cb(undefined, true);
  },
});

const uploadFile = (req, res, next) => {
  const upload = multerInitilizer.single('image');

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: err.message,
        error: true,
      });
    } if (err) {
      return res.status(500).json({
        message: err.message,
        error: true,
      });
    }
    return next();
  });
};

export default uploadFile;
