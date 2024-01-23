import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc38'),
    brand: 'Toyota',
    model: 'Hilux',
    year: 2011,
    plate: 'aaa111',
    price: {
      date: '2023-08-14T22:37:55.248+00:00',
      value: 77779,
    },
    locality: new mongoose.Types.ObjectId('655cd416c0687cd75f307495'),
  },
  {
    _id: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc39'),
    brand: 'Mercedes',
    model: 'gtr amg',
    year: 2012,
    plate: 'afg123',
    price: {
      date: '2023-12-05T00:00:00.000+00:00',
      value: 12000,
    },
    locality: new mongoose.Types.ObjectId('655cd422c0687cd75f307499'),
  },
  {
    _id: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc30'),
    brand: 'Volkswagen',
    model: 'golf',
    year: 2014,
    plate: 'pge143',
    price: {
      date: '2023-12-05T00:00:00.000+00:00',
      value: 10000,
    },
    locality: new mongoose.Types.ObjectId('655cd422c0687cd75f307499'),
  },
  {
    _id: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc31'),
    brand: 'Chevrolet',
    model: 'cruce',
    year: 2018,
    plate: 'lfg443',
    price: {
      date: '2023-12-05T00:00:00.000+00:00',
      value: 9000,
    },
    locality: new mongoose.Types.ObjectId('655cd416c0687cd75f307495'),
  },
];
