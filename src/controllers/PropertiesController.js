/* eslint-disable max-len */
// eslint-disable-next-line import/extensions
import Property from '../models/Property.js';

const getAll = async (req, res) => {
  try {
    const properties = await Property.find().populate(['location', 'propertyType']).lean();
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
      image: req.body.image,
    });

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
    const property = await Property.findOne({ _id: id }).populate(['location', 'propertyType']).lean();

    res.status(200).json({
      message: 'Propiedad encontrada',
      data: property,
      error: false,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Error al buscar propiedad',
      data: e,
      error: true,
    });
  }
};

export default {
  getOne, getAll, create, editData, deleteData,
};
