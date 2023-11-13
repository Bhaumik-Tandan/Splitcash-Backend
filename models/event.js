import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  country:{
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});


const Event = mongoose.model('event', EventSchema);

export default Event;