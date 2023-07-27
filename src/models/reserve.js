import mongoose from 'mongoose';

const { Schema } = mongoose;

const reserveSchema = new Schema({
  date_start: {
    type: Date,
    required: true,
  },
  date_end: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true,
  },
}, {
  timeseries: true,
});

export default mongoose.model('Reserve', reserveSchema);
