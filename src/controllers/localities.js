/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import Locality from '../models/locality.js';

const listLocalities = (req, res) => {
  Locality.find({}).then((localities) => {
    if (localities) {
      return res.json({ message: '', data: localities, error: false });
    }
    res.status(404).send({ message: 'localities not found', data: null, error: true }).end();
  }).catch((err) => {
    res.status(500).send({ message: err.message, data: null, error: true }).end();
  });
};

const listLocalityById = (req, res) => {
  Locality.findById(req.params.id).then((locality) => {
    if (locality) {
      return res.json({ message: '', data: locality, error: false });
    }
    res.status(404).send({ message: 'locality not found', data: null, error: true }).end();
  }).catch((err) => {
    res.status(500).send({ message: err.message, data: null, error: true }).end();
  });
};

const updateLocality = (req, res) => {
  const locality = req.body;

  Locality.findByIdAndUpdate(req.params.id, {
    name: locality.name,
  }, { new: true })
    .then((result) => {
      res.json({ message: '', data: result, error: false });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message, data: null, error: true }).end();
    });
};

const deleteLocality = (req, res) => {
  Locality.findByIdAndDelete(req.params.id).then(() => res.status(204).end()).catch((err) => {
    res.status(500).send({ message: err.message, data: null, error: true }).end();
  });
};

const createLocality = (req, res) => {
  const locality = req.body;

  const newLocality = new Locality({
    name: locality.name,
  });

  newLocality.save().then((savedLocality) => res.json({ message: '', data: savedLocality, error: false }))
    .catch((err) => {
      res.status(500).send({ message: err.message, data: null, error: true }).end();
    });
};

export default {
  createLocality,
  deleteLocality,
  updateLocality,
  listLocalities,
  listLocalityById,
};
