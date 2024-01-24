import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6577df53c7c87e77e9c754f1'),
    capacity: 2,
    address: 'san juan 1400',
    pricePerNight: {
      price: 200,
      date: '18-01-2024',
    },
    propertyType: new mongoose.Types.ObjectId('655cb7f26940c09944cdfdf1'),
    location: new mongoose.Types.ObjectId('655428e63b3608e49996f230'),
    image: '',
    status: 'occupied',
  },
  {
    _id: new mongoose.Types.ObjectId('6577df53c7c87e77e9c754f2'),
    capacity: 4,
    address: 'tucuman 2300',
    pricePerNight: {
      price: 350,
      date: '18-01-2024',
    },
    propertyType: new mongoose.Types.ObjectId('655cb7f26940c09944cdfdf2'),
    location: new mongoose.Types.ObjectId('655428e63b3608e49996f231'),
    image: '',
    status: 'available',
  },
  {
    _id: new mongoose.Types.ObjectId('6577df53c7c87e77e9c754f3'),
    capacity: 10,
    address: 'rioja 800',
    pricePerNight: {
      price: 500,
      date: '18-01-2024',
    },
    propertyType: new mongoose.Types.ObjectId('655cb7f26940c09944cdfdf3'),
    location: new mongoose.Types.ObjectId('655428e63b3608e49996f232'),
    image: '',
    status: 'available',
  },
  {
    _id: new mongoose.Types.ObjectId('6577df53c7c87e77e9c754f4'),
    capacity: 4,
    address: 'mendoza 3200',
    pricePerNight: {
      price: 150,
      date: '18-01-2024',
    },
    propertyType: new mongoose.Types.ObjectId('655cb7f26940c09944cdfdf4'),
    location: new mongoose.Types.ObjectId('655428e63b3608e49996f233'),
    image: '',
    status: 'occupied',
  },
];
