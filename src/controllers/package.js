/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import Package from '../models/package.js';

const listPackages = (req, res) => {
  Package.find({}).then((packages) => {
    if (packages) {
      return res.json({ message: 'Packages found', data: packages, error: false });
    }
    res.status(404).send({ message: 'packages not found', data: null, error: true }).end();
  }).catch((err) => {
    res.status(400).send({ message: err.message, data: null, error: true }).end();
  });
};

const getPackage = (req, res) => {
  Package.findById(req.params.id).then((pack) => {
    if (pack) {
      return res.json({ message: 'Package found', data: pack, error: false });
    }
    res.status(404).send({ message: 'package not found', data: null, error: true }).end();
  }).catch((err) => {
    res.status(400).send({ message: err.message, data: null, error: true }).end();
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
      res.json({ message: 'Package updated', data: result, error: false });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message, data: null, error: true }).end();
    });
};

const deletePackage = (req, res) => {
  Package.findByIdAndDelete(req.params.id).then(() => res.status(204).end()).catch((err) => {
    res.status(500).send({ message: err.message, data: null, error: true }).end();
  });
};

const createPackage = (req, res) => {
  const pack = req.body;

  const newCar = new Package({
    type: pack.type,
    property: pack.property,
    reserve: pack.reserve,
    car: pack.car,
    medicalAssistance: pack.medicalAssistance,
  });

  newCar.save().then((savedCar) => res.json({ message: 'Package created', data: savedCar, error: false }))
    .catch((err) => {
      res.status(400).send({ message: err.message, data: null, error: true }).end();
    });
};

export default {
  listPackages,
  getPackage,
  updatePackage,
  deletePackage,
  createPackage,
};
