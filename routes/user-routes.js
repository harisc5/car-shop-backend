import express from 'express';

import authMiddleware from '../middlewares/auth-middleware.js';
import { updateUser, deleteUser } from '../controllers/user-controller.js';

const router = express.Router();

router.put('/:id', authMiddleware, updateUser);

router.delete('/:id', authMiddleware, deleteUser);

export default router;