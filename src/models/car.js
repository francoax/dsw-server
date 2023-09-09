/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const priceCarSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
);

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
    price: priceCarSchema,
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

carSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Car', carSchema);
