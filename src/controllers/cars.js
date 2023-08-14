/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import Car from '../models/car.js';

const listCars = (req, res) => {
  Car.find({}).then((cars) => {
    if (cars) {
      return res.json(cars);
    }
    res.status(404).send({ error: 'cars not found' }).end();
  }).catch((err) => {
    res.status(500).send({ error: err.message }).end();
  });
};

const listCarById = (req, res) => {
  Car.findById(req.params.id).then((car) => {
    if (car) {
      return res.json(car);
    }
    res.status(404).send({ error: 'car not found' }).end();
  }).catch((err) => {
    res.status(500).send({ error: err.message }).end();
  });
};

const updateCar = (req, res) => {
  const car = req.body;
  if (car.price) {
    car.date = new Date();

    Car.findByIdAndUpdate(req.params.id, {
      brand: car.brand,
      model: car.model,
      year: car.year,
      plate: car.plate,
      price: {
        date: car.date,
        value: car.price,
      },
      locality: car.locality,
    }, { new: true })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send({ error: err.message }).end();
      });
  } else {
    (
      Car.findByIdAndUpdate(req.params.id, {
        brand: car.brand,
        model: car.model,
        year: car.year,
        plate: car.plate,
        locality: car.locality,
      }, { new: true })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(500).send({ error: err.message }).end();
        })
    );
  }
};

const deleteCar = (req, res) => {
  Car.findByIdAndDelete(req.params.id).then(() => res.status(204).end()).catch((err) => {
    res.status(500).send({ error: err.message }).end();
  });
};

const createCar = (req, res) => {
  const car = req.body;

  if (car.price) {
    car.date = new Date();
  }

  const newCar = new Car({
    brand: car.brand,
    model: car.model,
    year: car.year,
    plate: car.plate,
    price: {
      date: car.date,
      value: car.price,
    },
    locality: car.locality,
  });

  newCar.save().then((savedCar) => res.json(savedCar))
    .catch((err) => {
      res.status(500).send({ error: err.message }).end();
    });
};

export default {
  listCars,
  listCarById,
  createCar,
  updateCar,
  deleteCar,
};
