import BlockModel from './BlockModel.mjs';
import Transaction from './Transaction.mjs';

export default class Miner {
  constructor({ blockchain, wallet, transactionPool, pubsub }) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
    this.pubsub = pubsub;
  }
  async mineTransaction() {
    // Validate transactions in the pool
    const validTransactions = this.transactionPool.validateTransactions();

    // Include a reward for the miner
    validTransactions.push(
      Transaction.transactionReward({ miner: this.wallet })
    );

    // Add a new block with the valid transactions to the blockchain
    const newBlock = this.blockchain.addBlock({ data: validTransactions });

    // Save the new block to MongoDB
    try {
      const savedBlock = await BlockModel.create({
        timestamp: newBlock.timestamp,
        blockIndex: newBlock.blockIndex,
        lastHash: newBlock.lastHash,
        hash: newBlock.hash,
        data: newBlock.data,
        nonce: newBlock.nonce,
        difficulty: newBlock.difficulty,
      });

      console.log('New block saved to MongoDB:', savedBlock);
    } catch (error) {
      console.error('Error saving new block to MongoDB:', error);
      throw new Error('Error saving block to MongoDB');
    }

    // Broadcast the new block to the network
    this.pubsub.broadcast();

    // Clear the transaction pool
    this.transactionPool.clearTransactions();
  }
}