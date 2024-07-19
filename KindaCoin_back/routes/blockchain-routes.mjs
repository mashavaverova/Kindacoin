import express from 'express';
import { listBlock } from '../controllers/blockchain-controller.mjs';
import { protect, authorize } from '../middleware/authorization.mjs';

const router = express.Router();

router.use(protect);
router.route('/').get(authorize('admin', 'miner', 'user'), listBlock);

export default router;
