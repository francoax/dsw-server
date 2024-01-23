/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import Package from '../models/package.js';

const listConcept = async (req, res) => {
  const filter = req.query;
  try {
    let packages = await Package.find({ ...filter }).populate(['property', 'car', 'medicalAssistance']).lean();
    if (!packages) {
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
    reserve: pack.reserve,
    car: pack.car,
    medicalAssistance: pack.medicalAssistance,
  }, { new: true })
    .then((result) => {
      res.json({ message: 'Paquete actualizado', data: result, error: false });
    })
    .catch(() => {
      res.status(400).send({ message: 'Error al actualizar paquete', data: null, error: true }).end();
    });
};

const deletePackage = (req, res) => {
  Package.findByIdAndDelete(req.params.id).then(() => res.status(204).end()).catch(() => {
    res.status(500).send({ message: 'Error al eliminar paquete', data: null, error: true }).end();
  });
};

const createPackage = (req, res) => {
  const pack = req.body;

  const newCar = new Package({
    type: pack.type,
    property: pack.property,
    reserve: pack.reserve,
    car: pack.car === '' ? null : pack.car,
    medicalAssistance: pack.medicalAssistance === '' ? null : pack.medicalAssistance,
  });

  newCar.save().then((savedCar) => res.json({ message: 'Paquete creado', data: savedCar, error: false }))
    .catch((e) => {
      res.status(400).send({ message: 'Error al crear paquete', data: e.message, error: true }).end();
    });
};

export default {
  listConcept,
  getPackage,
  updatePackage,
  deletePackage,
  createPackage,
};
