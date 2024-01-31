/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import Package from '../models/package.js';

const listConcept = async (req, res) => {
  const filter = req.query;
  try {
    let packages = await Package.find({ ...filter }).populate(['property', 'car', 'medicalAssistance']).lean();
    if (packages.length === 0) {
      return res.status(404).json({
        message: 'Sin paquetes por el momento',
        data: packages,
        error: false,
      });
    }

    packages = packages.map((p) => {
      p.id = p._id;
      delete p._id;
      return { ...p };
    });

    return res.status(200).json({
      message: 'Lista de paquetes',
      data: packages,
      error: false,
    });
  } catch (e) {
    return res.status(400).json({
      message: 'Error al buscar paquetes',
      data: e,
      error: true,
    });
  }
};

const getPackage = (req, res) => {
  Package.findById(req.params.id).populate(['property', 'car', 'medicalAssistance']).lean().then((pack) => {
    if (pack) {
      return res.json({ message: 'Paquete encontrado', data: pack, error: false });
    }
    res.status(404).send({ message: 'Paquete no encontrado', data: null, error: true }).end();
  })
    .catch(() => {
      res.status(400).send({ message: 'Error al buscar paquete', data: null, error: true }).end();
    });
};

const updatePackage = (req, res) => {
  const pack = req.body;

  Package.findByIdAndUpdate(req.params.id, {
    type: pack.type,
    property: pack.property,
    car: pack.car,
    medicalAssistance: pack.medicalAssistance,
    image: pack.image,
    discount: pack.discount,
  }, { new: true })
    .populate(['property', 'car', 'medicalAssistance'])
    .then((result) => {
      res.status(200).json({
        message: 'Paquete actualizado',
        data: result,
        error: false,
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: 'Error al actualizar paquete',
        data: e,
        error: true,
      }).end();
    });
};

const deletePackage = (req, res) => {
  Package.findByIdAndDelete(req.params.id)
    .then((packageDeleted) => {
      if (!packageDeleted) {
        res.status(404).json({
          message: 'Paquete no encontrado o ya fue eliminado.',
          data: packageDeleted,
          error: false,
        });
      } else {
        res.status(200).json({
          message: 'Paquete eliminado',
          data: packageDeleted,
          error: false,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        message: 'Error al eliminar paquete',
        data: e,
        error: true,
      });
    });
};

const createPackage = async (req, res) => {
  const pack = req.body;

  try {
    const newPackage = await Package.create({
      type: pack.type,
      property: pack.property,
      car: pack.car === '' ? null : pack.car,
      medicalAssistance: pack.medicalAssistance === '' ? null : pack.medicalAssistance,
      image: pack.image === '' ? null : pack.image,
      discount: pack.discount === '' ? null : pack.discount,
    });
    const packageCreated = await Package.findOne({ _id: newPackage._id }).populate(['property', 'car', 'medicalAssistance']);
    return res.status(200).json({
      message: 'Paquete creado',
      data: packageCreated,
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

export default {
  listConcept,
  getPackage,
  updatePackage,
  deletePackage,
  createPackage,
};
