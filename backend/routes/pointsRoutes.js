import express from 'express';
import { getPointsTable, updatePoints } from '../controllers/pointsController.js';

const router = express.Router();

router.get('/', getPointsTable);
router.post('/update', updatePoints);

export default router;
