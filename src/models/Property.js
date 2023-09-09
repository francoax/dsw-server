import mongoose from 'mongoose';

const PropertiesSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  propertyType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'propertieType',
  },

});

export default mongoose.model('Propertie', PropertiesSchema);
