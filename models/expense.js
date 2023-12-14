import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ExpenseSchema = new Schema({
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: false
    },
    involvedUsers: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      share: Number
    }],
  }, {
    timestamps: true,
  });
  
  const Expense = mongoose.model('Expense', ExpenseSchema);
  
  export default Expense;