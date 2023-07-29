/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { Router } from 'express';
import Car from '../models/car.js';

const carRouter = Router();

// gets all cars
carRouter.get('/', (req, res, next) => {
  Car.find({}).then((cars) => {
    if (cars) {
      return res.json(cars);
    }
    res.status(404).send({ error: 'cars not found' }).end();
  }).catch((err) => {
    next(err);
  });
});

carRouter.get('/:id', (req, res, next) => {
  Car.findById(req.params.id).then((car) => {
    if (car) {
      return res.json(car);
    }
    res.status(404).send({ error: 'car not found' }).end();
  }).catch((err) => {
    next(err);
  });
});

carRouter.put('/:id', (req, res, next) => {
  const car = req.body;

  if (car.price) {
    car.priceDate = new Date();
  }

  Car.findByIdAndUpdate(req.params.id, {
    brand: car.brand,
    model: car.model,
    year: car.year,
    plate: car.plate,
    price: car.price,
    locality: car.locality,
  }, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

carRouter.delete('/:id', (req, res, next) => {
  Car.findByIdAndDelete(req.params.id).then(() => res.status(204).end()).catch((err) => {
    next(err);
  });
});

carRouter.post('/', (req, res, next) => {
  const car = req.body;

  const newCar = new Car({
    brand: car.brand,
    model: car.model,
    year: car.year,
    plate: car.plate,
    price: {
      date: new Date(),
      value: car.price,
    },
    locality: car.locality,
  });

  newCar.save().then((savedCar) => res.json(savedCar))
    .catch((err) => {
      next(err);
    });
});
// middleware for error control

carRouter.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  return res.status(500).end();
});

export default carRouter;
