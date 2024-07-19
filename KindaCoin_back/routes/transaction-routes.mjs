import express from 'express';
import { protect, authorize } from '../middleware/authorization.mjs';

import {
  addTransaction,
  getTransactionPool,
  getWalletBalance,
  mineTransactions,
} from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.use(protect);

router.route('/transaction').post(authorize('user', 'admin', 'miner'), addTransaction);
router.route('/transactions').get(authorize('user', 'admin', 'miner'), getTransactionPool);
router.route('/mine').get(authorize('user', 'admin', 'miner'), mineTransactions);
router.route('/info').get(authorize('user', 'admin', 'miner'), getWalletBalance);

export default router;
