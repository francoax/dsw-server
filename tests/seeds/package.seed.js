import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a1'),
    type: 'completo',
    property: new mongoose.Types.ObjectId('65b17fc9b7b9d7b66f31740c'),
    car: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc31'),
    medicalAssistance: new mongoose.Types.ObjectId('6581c007feeb428fa846203b'),
    image: 'image.png',
    discount: 0.5,
  },
  {
    _id: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a2'),
    type: 'custom',
    property: new mongoose.Types.ObjectId('65b17f725dbefe507285b207'),
    car: null,
    medicalAssistance: null,
  },
  {
    _id: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a3'),
    type: 'custom',
    property: new mongoose.Types.ObjectId('65b17f0fa5e9063d56984565'),
    car: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc32'),
    medicalAssistance: null,
  },
  {
    _id: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a4'),
    type: 'custom',
    property: new mongoose.Types.ObjectId('65b17e1012459c3108bc808d'),
    car: null,
    medicalAssistance: new mongoose.Types.ObjectId('6581c007feeb428fa84620dd'),
  },
];
