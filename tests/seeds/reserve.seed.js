import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6580ce85751be545d7bebad1'),
    date_start: '2022-01-01',
    date_end: '2022-01-31',
    user: new mongoose.Types.ObjectId('65270324a6ecc0ccbf909cb5'),
    packageReserved: mongoose.Types.ObjectId('652dd48c82681f59fdc830a1'),
  },
  {
    _id: new mongoose.Types.ObjectId('6580ce85751be545d7bebad2'),
    date_start: '2022-01-10',
    date_end: '2022-01-01',
    user: new mongoose.Types.ObjectId('65270324a6ecc0ccbf909cb6'),
    packageReserved: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a2'),
  },
];
