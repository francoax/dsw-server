import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export default [
  {
    _id: new mongoose.Types.ObjectId('65270324a6ecc0ccbf909cb5'),
    name: 'John',
    lastname: 'Doe',
    address: 'Fake Street 123',
    email: 'JhonDoe@Gmail.com',
    password: bcrypt.hashSync('12345678', 10),
    tel: '12345678',
    role: 'admin',
  },
  {
    _id: new mongoose.Types.ObjectId('65270324a6ecc0ccbf909cb6'),
    name: 'Tomás',
    lastname: 'Bottoni',
    address: 'Zeit Street 123',
    email: 'Bottoni@Gmail.com',
    password: bcrypt.hashSync('12345678', 10),
    tel: '12345678',
    role: 'user',
  },
  {
    _id: new mongoose.Types.ObjectId('65270324a6ecc0ccbf909cb7'),
    name: 'Juan',
    lastname: 'Perez',
    address: 'Super Street 123',
    email: 'Perez@Gmail.com',
    password: bcrypt.hashSync('12345678', 10),
    tel: '12345678',
    role: 'admin',
  },
  {
    _id: new mongoose.Types.ObjectId('65270324a6ecc0ccbf909cb9'),
    name: 'super',
    lastname: 'admin',
    address: 'Super Street 123',
    email: 'superAdmin@gmail.com',
    password: bcrypt.hashSync('12345678', 10),
    tel: '12345678',
    role: 'SUPER_ADMIN',
  },
];
