/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import Car from '../models/car.js';

const listCars = (req, res) => {
  const filter = req.query;
  Car.find({ ...filter }).then((cars) => {
    if (cars) {
      return res.json({ message: 'Vehiculos encontrados', data: cars, error: false });
    }
    res.status(404).send({ message: 'No se encontraron vehiculos', data: null, error: true }).end();
  }).catch(() => {
    res.status(400).send({ message: 'Error al buscar vehiculos', data: null, error: true }).end();
  });
};

const listCarById = (req, res) => {
  Car.findById(req.params.id).then((car) => {
    if (car) {
      return res.json({ message: 'Vehiculo encontrado', data: car, error: false });
    }
    res.status(404).send({ message: 'El vehiculo no existe', data: null, error: true }).end();
  }).catch(() => {
    res.status(400).send({ message: 'Error al buscar vehiculo', data: null, error: true }).end();
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
      res.json({ message: 'Vehiculo actualizado', data: result, error: false });
    })
    .catch(() => {
      res.status(400).send({ message: 'Error al actualizar vehiculo', data: null, error: true }).end();
    });
};

const deleteCar = (req, res) => {
  Car.findByIdAndDelete(req.params.id).then(() => res.status(204).end()).catch(() => {
    res.status(400).send({ message: 'Error al eliminar vehiculo', data: null, error: true }).end();
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

  newCar.save().then((savedCar) => res.json({ message: 'Vehiculo creado', data: savedCar, error: false }))
    .catch(() => {
      res.status(400).send({ message: 'Error al crear vehiculo', data: null, error: true }).end();
    });
};

export default {
  listCars,
  listCarById,
  createCar,
  updateCar,
  deleteCar,
};
