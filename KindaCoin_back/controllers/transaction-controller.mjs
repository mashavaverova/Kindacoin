import { transactionPool, blockchain, wallet, pubnubServer } from '../server.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';

import Miner from '../models/Miner.mjs';
import Wallet from '../models/Wallet.mjs';
import ResponseModel from '../utilities/ResponseModel.mjs';

import TransactionModel from '../models/TransactionModel.mjs';


// @desc    Add a new transaction
// @route   POST /api/v1/transaction
// @access  PRIVATE
export const addTransaction = asyncHandler(async (req, res, next) => {
  const { amount, recipient } = req.body;

  // Assuming wallet is available in the context, adjust this part as per your logic
  const wallet = new Wallet();

  // Check if the transaction already exists in the pool
  let transaction = transactionPool.transactionExist({
    address: wallet.publicKey,
  });

  if (transaction) {
    transaction.update({ sender: wallet, recipient, amount });
  } else {
    transaction = wallet.createTransaction({ recipient, amount });
  }

  transactionPool.addTransaction(transaction);
  pubnubServer.broadcastTransaction(transaction);

  console.log('New transaction added:', transaction);

    // Serialize the signature
    const serializedSignature = JSON.stringify(transaction.inputMap.signature);

    // Save the transaction to MongoDB
    try {
      const savedTransaction = await TransactionModel.create({
        id: transaction.id,
        outputMap: transaction.outputMap,
        inputMap: {
          timestamp: transaction.inputMap.timestamp,
          amount: transaction.inputMap.amount,
          address: transaction.inputMap.address,
          signature: serializedSignature,
        },
      });

    console.log('Transaction saved to MongoDB:', savedTransaction);

    // Respond with the saved transaction data
    res.status(201).json(
      new ResponseModel({ success: true, statusCode: 201, data: savedTransaction })
    );
  } catch (err) {
    console.error('Error saving transaction:', err);
    next(err);
  }
});

// @desc    Get wallet balance
// @route   GET /api/v1/wallet/balance
// @access  PRIVATE
export const getWalletBalance = asyncHandler(async (req, res, next) => {
  const address = wallet.publicKey;
  const balance = Wallet.calculateBalance({ chain: blockchain.chain, address });

  console.log('Wallet balance fetched:'.green, { address, balance });

  res
    .status(200)
    .json(
      new ResponseModel({
        success: true,
        statusCode: 200,
        data: { address, balance },
      })
    );
});

// @desc    Get transaction pool
// @route   GET /api/v1/transaction/pool
// @access  PRIVATE
export const getTransactionPool = asyncHandler(async (req, res, next) => {
  console.log(
    'Transaction pool fetched:'.green,
    transactionPool.transactionMap
  );

  // Respond with the current transaction pool
  res
    .status(200)
    .json(
      new ResponseModel({
        success: true,
        statusCode: 200,
        data: transactionPool.transactionMap,
      })
    );
});

// @desc    Mine transactions
// @route   POST /api/v1/transaction/mine
// @access  PRIVATE
export const mineTransactions = asyncHandler(async (req, res, next) => {
  const miner = new Miner({
    blockchain,
    transactionPool,
    wallet,
    pubsub: pubnubServer,
  }); // Create a new Miner instance

  miner.mineTransaction(); // Start mining transactions

  console.log('Transactions mined successfully:'.green);

  // Respond with a success message
  res
    .status(200)
    .json(
      new ResponseModel({
        success: true,
        statusCode: 200,
        data: 'Mine completed',
      })
    );
});
