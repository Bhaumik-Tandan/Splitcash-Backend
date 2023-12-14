import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const GroupSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    type:{
      type:String
    }
  }, {
    timestamps: true,
  });
  
  const Group = mongoose.model('Group', GroupSchema);
  
  export default Group;