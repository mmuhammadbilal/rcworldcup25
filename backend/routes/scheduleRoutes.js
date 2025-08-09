import express from 'express';
import { createSchedule, getSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

router.post('/', createSchedule);
router.get('/', getSchedule);

export default router;
