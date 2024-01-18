import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('6580ce85751be545d7bebad1'),
    date_start: '2022-01-01',
    date_end: '2022-01-31',
    user: mongoose.Types.ObjectId('65768fce19f5c0af7df24df1'),
    packageReserved: mongoose.Types.ObjectId('652dd48c82681f59fdc830a1'),
  },
  {
    _id: mongoose.Types.ObjectId('6580ce85751be545d7bebad2'),
    date_start: '2022-01-10',
    date_end: '2022-01-01',
    user: mongoose.Types.ObjectId('65768fce19f5c0af7df24df2'),
    packageReserved: mongoose.Types.ObjectId('652dd48c82681f59fdc830a2'),
  },
];
