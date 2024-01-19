import mongoose from 'mongoose';

const propertyPriceSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

});

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
    type: propertyPriceSchema,
    required: true,
  },
  propertyType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'propertyType',
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'locality',
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  status: {
    type: String,
    required: true,
    enum: ['occupied', 'available'],
    default: 'available',
  },
});

export default mongoose.model('Property', PropertiesSchema);
