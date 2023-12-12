/* eslint-disable max-len */
// eslint-disable-next-line import/extensions
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Property from '../models/Property.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

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

const getAll = async (req, res) => {
  try {
    const properties = await Property.find().populate(['location', 'propertyType']);
    res.status(200).json({
      message: 'Lista de propiedades',
      data: properties,
      error: false,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Error al buscar propiedades',
      error: true,
    });
  }
};

const create = async (req, res) => {
  try {
    const newProperty = await Property.create({
      capacity: req.body.capacity,
      address: req.body.address,
      pricePerNight: req.body.pricePerNight,
      propertyType: req.body.propertyType,
      location: req.body.location,
      image: req.file.filename,
    });

    return res.status(200).json({
      message: 'Propiedad creada',
      data: newProperty,
      error: false,
    });
  } catch (e) {
    if (req.file) {
      fs.unlinkSync(`${req.file.path}`);
    }
    return res.status(400).json({
      message: 'Error al crear propiedad',
      data: e,
      error: true,
    });
  }
};

const editData = async (req, res) => {
  const { id } = req.params;
  try {
    const prop = await Property.findByIdAndUpdate(id, { ...req.body }, { new: true });
    res.status(201).json({
      message: 'Propiedad editada',
      data: prop,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Error al editar propiedad',
      error: true,
    });
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const propertyDeleted = await Property.findByIdAndDelete({ _id: id });

    if (!propertyDeleted) {
      throw new Error();
    }

    fs.unlinkSync(`images/${propertyDeleted.image}`);
    res.status(200).json({
      message: 'Propiedad eliminada',
      error: false,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Error al eliminar propiedad',
      error: true,
    });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findOne({ _id: id }).populate(['location', 'propertyType']);
    res.status(200).json({
      message: 'Propiedad encontrada',
      data: property,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Error al buscar propiedad',
      error: true,
    });
  }
};

export default {
  getOne, getAll, create, editData, deleteData, uploadFile,
};
