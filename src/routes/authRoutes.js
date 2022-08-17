import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import validateLoginUser from '../middlewares/loginUserMiddleware.js';
import validateNewUser from '../middlewares/registerUserMiddleware.js';
const router = Router();

router.post('/sign-up', validateNewUser, registerUser);

router.post('/sign-in', validateLoginUser, loginUser);

export default router;
