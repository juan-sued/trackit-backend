import { Router } from 'express';
import { registerUser } from '../controllers/usersController.js';
import validateLoginUser from '../middlewares/loginUserMiddleware.js';
import validateNewUser from '../middlewares/registerUserMiddleware.js';
const router = Router();

router.post('/users', validateNewUser, registerUser);
router.post('/sessions', validateLoginUser);

export default router;
