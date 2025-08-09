import express from 'express';
import { addOrUpdatePlayer, getTopPlayers } from '../controllers/playerStatsController.js';

const router = express.Router();

router.post('/', addOrUpdatePlayer);
router.get('/top', getTopPlayers); // use query ?type=Batter|Bowler|Allrounder

export default router;
