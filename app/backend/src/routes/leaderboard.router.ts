import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controllers';

const router = Router();

router.get('/home', LeaderboardController.getLeaderboard);

export default router;
