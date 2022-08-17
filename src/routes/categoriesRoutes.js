import { Router } from 'express';
import { registerCategory, getCategories } from '../controllers/categoriesController.js';

import validateNewCategory from '../middlewares/registerCategoriesMiddleware.js';

const router = Router();

router.post('/categories', validateNewCategory, registerCategory);

router.get('/categories', getCategories);

export default router;
