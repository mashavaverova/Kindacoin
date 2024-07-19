import express from 'express';
import {
  mineBlock,
  getBlockByIndex,
} from '../controllers/block-controller.mjs';
import { protect, authorize } from '../middleware/authorization.mjs';

const router = express.Router();

router.use(protect);

router
.route('/mine')
.post(authorize('user', 'admin', 'miner'), mineBlock);

router
  .route('/:blockIndex')
  .get(authorize('admin', 'miner', 'user'), getBlockByIndex);

export default router;
