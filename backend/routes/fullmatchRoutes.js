import express from 'express';
import { upload, submitFullMatch } from '../controllers/fullmatchController.js';

const router = express.Router();

router.post('/match/full', upload.single('screenshots'), submitFullMatch);

export default router;
