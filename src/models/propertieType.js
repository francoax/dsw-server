import mongoose, {Schema, model} from "mongoose";

const propertietypeSchema = new Schema({
  description: {
    type: String,
    required: true,
  }
},{
  timestamps:true
});

export default mongoose.model('propertieType', propertietypeSchema);