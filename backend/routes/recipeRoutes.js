import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addRecipe, getRecipes, saveRecipe, getSavedRecipes, updateRecipe, deleteRecipe } from '../controllers/recipeController.js';

const router = express.Router();

router.route('/').get(protect, getRecipes).post(protect, addRecipe).put(protect, saveRecipe);
router.route('/savedRecipes').get(protect, getSavedRecipes);
router.route('/:id').put(protect, updateRecipe).delete(protect, deleteRecipe);

export default router;