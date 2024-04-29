import express from 'express';

import authMiddleware from '../middlewares/auth-middleware.js';
import { buyCar, createCar, deleteCar, getCarById, getCars, updateCar } from '../controllers/car-controller.js';

const router = express.Router();

router.get('/', getCars);

router.post('/', authMiddleware, createCar);

router.get('/:id', authMiddleware, getCarById);

router.put('/:id', authMiddleware,  updateCar);

router.delete('/:id', authMiddleware, deleteCar);

router.post('/purchase/:id', authMiddleware, buyCar);

export default router;