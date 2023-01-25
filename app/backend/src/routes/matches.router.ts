import { Router } from 'express';
import MatchesController from '../controllers/matches.controllers';

const router = Router();

router.get('/?', MatchesController.getMatchesByQuery);
router.get('/', MatchesController.getMatches);

export default router;
