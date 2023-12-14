import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const BalanceSchema = new Schema({
    user1: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  });
  
  const Balance = mongoose.model('Balance', BalanceSchema);

  export default Balance;