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
    const properties = await Property.find();
    res.status(200).json({
      message: 'Data received successfully',
      data: properties,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      error: true,
    });
  }
};

const create = async (req, res) => {
  try {
    const newProperty = await Property.create({
      capacity: req.body.capacity,
      address: req.body.address,
      pricePerNight: {
        price: req.body.price,
        date: req.body.date,
      },
      propertyType: req.body.propertyType,
      locality: req.body.locality,
      urlImage: fileNameNow,
    });
    res.status(200).json({
      message: 'Data added succesfully',
      data: newProperty,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
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
      message: 'Data updated succesfully',
      data: prop,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      error: true,
    });
  }
};
const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    await Property.deleteOne({ _id: id });
    res.status(200).json({
      message: 'Data deleted succesfully',
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      error: true,
    });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findOne({ _id: id });
    res.status(200).json({
      message: 'Data obtained successfully',
      data: property,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      error: true,
    });
  }
};

export default {
  getOne, getAll, create, editData, deleteData, uploadExport,
};
