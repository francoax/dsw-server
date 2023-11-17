/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import Car from '../models/car.js';

const listCars = (req, res) => {
  Car.find({}).then((cars) => {
    if (cars) {
      return res.json({ message: '', data: cars, error: false });
    }
    res.status(404).send({ message: 'cars not found', data: null, error: true }).end();
  }).catch((err) => {
    res.status(400).send({ message: err.message, data: null, error: true }).end();
  });
};

const listCarById = (req, res) => {
  Car.findById(req.params.id).then((car) => {
    if (car) {
      return res.json({ message: '', data: car, error: false });
    }
    res.status(404).send({ message: 'car not found', data: null, error: true }).end();
  }).catch((err) => {
    res.status(400).send({ message: err.message, data: null, error: true }).end();
  });
};

const updateCar = (req, res) => {
  const car = req.body;

  Car.findByIdAndUpdate(req.params.id, {
    brand: car.brand,
    model: car.model,
    year: car.year,
    plate: car.plate,
    price: {
      date: car.price.date,
      value: car.price.value,
    },
    locality: car.locality,
  }, { new: true })
    .then((result) => {
      res.json({ message: '', data: result, error: false });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message, data: null, error: true }).end();
    });
};

const deleteCar = (req, res) => {
  Car.findByIdAndDelete(req.params.id).then(() => res.status(204).end()).catch((err) => {
    res.status(500).send({ message: err.message, data: null, error: true }).end();
  });
};

const createCar = (req, res) => {
  const car = req.body;

  const newCar = new Car({
    brand: car.brand,
    model: car.model,
    year: car.year,
    plate: car.plate,
    price: {
      date: car.price.date,
      value: car.price.value,
    },
    locality: car.locality,
  });

  newCar.save().then((savedCar) => res.json({ message: '', data: savedCar, error: false }))
    .catch((err) => {
      res.status(400).send({ message: err.message, data: null, error: true }).end();
    });
};

export default {
  listCars,
  listCarById,
  createCar,
  updateCar,
  deleteCar,
};
