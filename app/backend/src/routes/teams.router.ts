import { Router } from 'express';
import TeamsController from '../controllers/teams.controllers';

const router = Router();

router.get('/', TeamsController.getTeams);
router.get('/:id', TeamsController.getTeamsById);

export default router;
