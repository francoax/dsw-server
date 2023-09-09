import PropertyPrice from '../models/PropertyPrice';

const getAll = async (req, res) => {
  try {
    const propertyPrices = await PropertyPrice.find();
    res.status(200).json({
      message: 'Data received successfully',
      data: propertyPrices,
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
    const pPrice = await PropertyPrice.create({
      propertyId: req.body.propertyId,
      price: req.body.price,
      date: req.body.date,
    });
    res.status(200).json({
      message: 'Data added succesfully',
      data: pPrice,
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
    await PropertyPrice.updateOne({ propertyId: id }, { ...req.body });
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
    await PropertyPrice.deleteOne({ propertyId: id });
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
    const pPrice = await PropertyPrice.findOne({ propertyId: id });
    res.status(200).json({
      message: 'Data obtained successfully',
      data: pPrice,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      error: true,
    });
  }
};

export default {
  getOne, getAll, create, deleteData, editData,
};
