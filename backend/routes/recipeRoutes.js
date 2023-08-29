import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addRecipe, getRecipes, updateRecipe, deleteRecipe } from '../controllers/recipeController.js';

const router = express.Router();

router.route('/').get(protect, getRecipes).post(protect, addRecipe);
router.route('/:id').put(protect, updateRecipe).delete(protect, deleteRecipe);

export default router;