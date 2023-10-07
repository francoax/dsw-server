import Property from '../models/Property.js';

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
        price: req.body.pricePerNight.price,
        date: req.body.pricePerNight.date,
      },
      propertyType: req.body.propertyType,
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
const editData = async (req, res) => {
  const { id } = req.params;
  try {
    await Property.updateOne({ _id: id }, { ...req.body });
    res.status(201).json({
      message: 'Data updated succesfully',
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
  getOne, getAll, create, editData, deleteData,
};
