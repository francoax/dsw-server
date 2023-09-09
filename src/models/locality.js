/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const localitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

localitySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Locality', localitySchema);
