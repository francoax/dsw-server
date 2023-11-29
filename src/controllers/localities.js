/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import Locality from '../models/locality.js';

const listLocalities = (req, res) => {
  Locality.find({}).then((localities) => {
    if (localities) {
      return res.json({ message: 'Localidades encontradas', data: localities, error: false });
    }
    res.status(404).send({ message: 'Localidades no encontradas', data: null, error: true }).end();
  }).catch(() => {
    res.status(500).send({ message: 'Error al buscar localidades', data: null, error: true }).end();
  });
};

const listLocalityById = (req, res) => {
  Locality.findById(req.params.id).then((locality) => {
    if (locality) {
      return res.json({ message: 'Localidad encontrada', data: locality, error: false });
    }
    res.status(404).send({ message: 'Localidad no encontrada', data: null, error: true }).end();
  }).catch(() => {
    res.status(500).send({ message: 'Error al buscar localidad', data: null, error: true }).end();
  });
};

const updateLocality = (req, res) => {
  const locality = req.body;

  Locality.findByIdAndUpdate(req.params.id, {
    name: locality.name,
  }, { new: true })
    .then((result) => {
      res.json({ message: 'Localidad actualizada', data: result, error: false });
    })
    .catch(() => {
      res.status(500).send({ message: 'Error al actualizar localidad', data: null, error: true }).end();
    });
};

const deleteLocality = (req, res) => {
  Locality.findByIdAndDelete(req.params.id).then(() => res.status(204).end()).catch(() => {
    res.status(500).send({ message: 'Error al eliminar localidad', data: null, error: true }).end();
  });
};

const createLocality = (req, res) => {
  const locality = req.body;

  const newLocality = new Locality({
    name: locality.name,
  });

  // eslint-disable-next-line max-len
  newLocality.save().then((savedLocality) => res.json({ message: 'Localidad creada', data: savedLocality, error: false }))
    .catch(() => {
      res.status(500).send({ message: 'Error al crear localidad', data: null, error: true }).end();
    });
};

export default {
  createLocality,
  deleteLocality,
  updateLocality,
  listLocalities,
  listLocalityById,
};
