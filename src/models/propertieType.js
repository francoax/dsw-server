import mongoose, { Schema } from 'mongoose';

const propertytypeSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('propertyType', propertytypeSchema);
