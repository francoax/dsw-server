// eslint-disable-next-line import/extensions
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Property from '../models/Property.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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

    if (!newProperty) {
      return res.status(400).json({
        message: 'Error al crear propiedad',
        data: req.body,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Propiedad creada',
      data: newProperty,
      error: false,
    });
  } catch (e) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
      console.log('Eliminando archivo', req.file.path);
    }
    return res.status(400).json({
      message: 'Error al crear propiedad',
      data: e,
      error: true,
    });
  }
};
/* await Property.updateOne({ _id: id }, { ...req.body }) */
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
    await Property.deleteOne({ _id: id });
    res.status(200).json({
      message: 'Propiedad eliminada',
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
  getOne, getAll, create, editData, deleteData, upload,
};
