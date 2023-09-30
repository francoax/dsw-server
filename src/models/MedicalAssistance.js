import mongoose from 'mongoose';

const MedicalASchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  coverageType: {
    type: String,
    required: true,
  },
},
{
  timestamps:true
});

export default mongoose.model('MedicalAssistance', MedicalASchema);
