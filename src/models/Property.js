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
    ref: 'propertyType',
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['occupied', 'available'],
    default: 'available',
  },
});

export default mongoose.model('Property', PropertiesSchema);
