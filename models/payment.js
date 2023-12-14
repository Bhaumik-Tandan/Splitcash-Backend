import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
    payer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    payee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    expense: {
      type: Schema.Types.ObjectId,
      ref: 'Expense',
      required: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  }, {
    timestamps: true,
  });
  
  const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;  