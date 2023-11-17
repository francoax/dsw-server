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
  pricePerNight: propertyPriceSchema,
  propertyType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'propertieType',
  },
  locality:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'locality',
  },
  urlImage: {
    type: String,
  }
});

export default mongoose.model('Propertie', PropertiesSchema);
