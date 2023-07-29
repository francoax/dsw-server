/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { Router } from 'express';
import Locality from '../models/locality.js';

const localityRouter = Router();

// gets all localities
localityRouter.get('/', (req, res, next) => {
  Locality.find({}).then((localities) => {
    if (localities) {
      return res.json(localities);
    }
    res.status(404).send({ error: 'localities not found' }).end();
  }).catch((err) => {
    next(err);
  });
});

localityRouter.get('/:id', (req, res, next) => {
  Locality.findById(req.params.id).then((locality) => {
    if (locality) {
      return res.json(locality);
    }
    res.status(404).send({ error: 'locality not found' }).end();
  }).catch((err) => {
    next(err);
  });
});

localityRouter.put('/:id', (req, res, next) => {
  const locality = req.body;

  Locality.findByIdAndUpdate(req.params.id, {
    name: locality.name,
  }, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

localityRouter.delete('/:id', (req, res, next) => {
  Locality.findByIdAndDelete(req.params.id).then(() => res.status(204).end()).catch((err) => {
    next(err);
  });
});

localityRouter.post('/', (req, res, next) => {
  const locality = req.body;

  const newLocality = new Locality({
    name: locality.name,
  });

  newLocality.save().then((savedLocality) => res.json(savedLocality))
    .catch((err) => {
      next(err);
    });
});
// middleware for error control

localityRouter.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  return res.status(500).end();
});

export default localityRouter;
