
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  outputMap: {
    type: Map,
    of: Number,
    required: true,
  },
  inputMap: {
    type: new mongoose.Schema({
      timestamp: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      signature: {
        type: String,
        required: true,
      },
    }),
    required: true,
  },
});

const Transaction = mongoose.model('TransactionModel', TransactionSchema);

export default Transaction;
