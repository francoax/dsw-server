import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('65b17fc9b7b9d7b66f31740c'),
    capacity: 2,
    address: 'san juan 1400',
    pricePerNight: 123,
    propertyType: {
      _id: new mongoose.Types.ObjectId('655cb7f26940c09944cdfdf1'),
      description: 'casa',
    },
    location: {
      _id: new mongoose.Types.ObjectId('655428e63b3608e49996f230'),
      name: 'Mar del Plata',
    },
    image: 'http://localhost:4000/api/properties/65b17fc9b7b9d7b66f31740c/image',
    status: 'available',
  },
  {
    _id: new mongoose.Types.ObjectId('65b17f725dbefe507285b207'),
    capacity: 4,
    address: 'tucuman 2300',
    pricePerNight: 562,
    propertyType: {
      _id: new mongoose.Types.ObjectId('655cb7f26940c09944cdfdf3'),
      description: 'casa',
    },
    location: {
      _id: new mongoose.Types.ObjectId('655428e63b3608e49996f232'),
      name: 'Mar del Plata',
    },
    image: '',
    status: 'available',
  },
  {
    _id: new mongoose.Types.ObjectId('65b17f0fa5e9063d56984565'),
    capacity: 10,
    address: 'rioja 800',
    pricePerNight: 500,
    propertyType: {
      _id: new mongoose.Types.ObjectId('655cb7f26940c09944cdfdf3'),
      description: 'casa',
    },
    location: {
      _id: new mongoose.Types.ObjectId('655428e63b3608e49996f231'),
      name: 'Mar del Plata',
    },
    image: '',
    status: 'available',
  },
  {
    _id: new mongoose.Types.ObjectId('65b17e1012459c3108bc808d'),
    capacity: 4,
    address: 'mendoza 3200',
    pricePerNight: 782,
    propertyType: {
      _id: new mongoose.Types.ObjectId('655cb7f26940c09944cdfdf2'),
      description: 'casa',
    },
    location: {
      _id: new mongoose.Types.ObjectId('655428e63b3608e49996f231'),
      name: 'Mar del Plata',
    },
    image: '',
    status: 'occupied',
  },
];
