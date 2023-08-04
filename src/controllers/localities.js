/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import Locality from '../models/locality.js';

const listLocalities = (req, res) => {
  Locality.find({}).then((localities) => {
    if (localities) {
      return res.json(localities);
    }
    res.status(404).send({ error: 'localities not found' }).end();
  }).catch((err) => {
    res.status(500).send({ error: err.message }).end();
  });
};

const listLocalityById = (req, res) => {
  Locality.findById(req.params.id).then((locality) => {
    if (locality) {
      return res.json(locality);
    }
    res.status(404).send({ error: 'locality not found' }).end();
  }).catch((err) => {
    res.status(500).send({ error: err.message }).end();
  });
};

const updateLocality = (req, res) => {
  const locality = req.body;

  Locality.findByIdAndUpdate(req.params.id, {
    name: locality.name,
  }, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message }).end();
    });
};

const deleteLocality = (req, res) => {
  Locality.findByIdAndDelete(req.params.id).then(() => res.status(204).end()).catch((err) => {
    res.status(500).send({ error: err.message }).end();
  });
};

const createLocality = (req, res) => {
  const locality = req.body;

  const newLocality = new Locality({
    name: locality.name,
  });

  newLocality.save().then((savedLocality) => res.json(savedLocality))
    .catch((err) => {
      res.status(500).send({ error: err.message }).end();
    });
};

export default {
  createLocality,
  deleteLocality,
  updateLocality,
  listLocalities,
  listLocalityById,
};
