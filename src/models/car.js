import mongoose from 'mongoose';

const { Schema } = mongoose;

const carSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PriceCar',
      required: true,
    },
    locality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Locality',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Car', carSchema);
