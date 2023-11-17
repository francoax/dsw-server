/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const packageSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    property: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Property',
      required: false,
    },
    car: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Car',
      required: false,
    },
    reserve: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Reserve',
      required: false,
    },
    medicalAssistance: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'MedicalAssistance',
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

packageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
export default mongoose.model('Package', packageSchema);
