import express from 'express';
import { protect, authorize } from '../middleware/authorization.mjs';
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/user-controller.mjs';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
