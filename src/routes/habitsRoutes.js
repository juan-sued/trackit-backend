import { Router } from 'express';
import authUser from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/habits', authUser);

export default router;
