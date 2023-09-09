import mongoose from 'mongoose';

const propertyPriceSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Property',
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

});

export default mongoose.model('PropertyPrice', propertyPriceSchema);
