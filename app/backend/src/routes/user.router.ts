import { Router } from 'express';
import validateLogin from '../middlewares/userLogin';
import UserController from '../controllers/user.controllers';

const router = Router();

router.post('/', validateLogin, UserController.login);
router.get('/validate', UserController.validate);

export default router;
