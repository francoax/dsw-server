import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a1'),
    type: 'completo',
    property: new mongoose.Types.ObjectId('6577df53c7c87e77e9c754f1'),
    car: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc31'),
    medicalAssistance: new mongoose.Types.ObjectId('6581c007feeb428fa846203b'),
    nameImage: 'image.png',
  },
  {
    _id: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a2'),
    type: 'custom',
    property: new mongoose.Types.ObjectId('6577df53c7c87e77e9c754f2'),
    car: null,
    medicalAssistance: null,
  },
  {
    _id: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a3'),
    type: 'custom',
    property: new mongoose.Types.ObjectId('6577df53c7c87e77e9c754f3'),
    car: new mongoose.Types.ObjectId('6545c23e7010457f8a26cc32'),
    medicalAssistance: null,
  },
  {
    _id: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a4'),
    type: 'custom',
    property: new mongoose.Types.ObjectId('6577df53c7c87e77e9c754f4'),
    car: null,
    medicalAssistance: new mongoose.Types.ObjectId('6581c007feeb428fa84620dd'),
  },
];
