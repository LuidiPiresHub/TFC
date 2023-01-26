import { Router } from 'express';
import MatchesController from '../controllers/matches.controllers';
import validateToken from '../middlewares/validateToken';
import validateMatches from '../middlewares/matches';

const router = Router();

router.get('/', MatchesController.getMatches);
router.post('/', validateToken, validateMatches, MatchesController.postMatch);
router.patch('/:id/finish', MatchesController.finishMatch);
router.patch('/:id', MatchesController.updateMatches);

export default router;
