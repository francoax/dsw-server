import mongoose from 'mongoose';

const MedicalASchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverageType: {
    type: String,
    required: true,
  },

});

export default mongoose.model('MedicalAssistance', MedicalASchema);
