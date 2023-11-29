import multer from 'multer';
// eslint-disable-next-line import/extensions
import Property from '../models/Property.js';

let fileNameNow = '';
// Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    fileNameNow = `${Date.now()}-${file.originalname}`;
    cb(null, fileNameNow);
  },
});
const upload = multer({ storage });

const uploadExport = upload.single('image');
// Multer

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
      // pricePerNight: {
      //   price: req.body.price,
      //   date: req.body.date,
      // },
      pricePerNight: req.body.pricePerNight,
      propertyType: req.body.propertyType,
      location: req.body.location,
      urlImage: fileNameNow,
    });

    if (!newProperty) {
      return res.status(400).json({
        message: 'Error al crear propiedad',
        data: req.body,
        error: true,
      });
    }

    uploadExport();

    return res.status(200).json({
      message: 'Propiedad creada',
      data: newProperty,
      error: false,
    });
  } catch (e) {
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
  getOne, getAll, create, editData, deleteData, uploadExport,
};
