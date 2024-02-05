import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc38'),
    brand: 'Toyota',
    model: 'Hilux',
    year: 2011,
    plate: 'aaa111',
    price: 1400,
    location: 'Casa de nico, AR',
  },
  {
    _id: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc39'),
    brand: 'Mercedes',
    model: 'gtr amg',
    year: 2012,
    plate: 'afg123',
    price: 12000,
    location: 'Casa de octa, AR',
  },
  {
    _id: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc30'),
    brand: 'Volkswagen',
    model: 'golf',
    year: 2014,
    plate: 'pge143',
    price: 1450,
    location: 'Casa de tomi, AR',
  },
  {
    _id: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc31'),
    brand: 'Chevrolet',
    model: 'cruce',
    year: 2018,
    plate: 'lfg443',
    price: 15005,
    location: 'Casa de franco, AR',
  },
];
