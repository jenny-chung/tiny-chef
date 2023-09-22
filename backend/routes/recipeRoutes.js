import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
    addRecipe, 
    getRecipes,
    getRecipe,
    saveRecipe,
    unsaveRecipe,
    getSavedRecipes,
    getSavedRecipesIds,
    updateRecipe,
    deleteRecipe } from '../controllers/recipeController.js';

const router = express.Router();

router.route('/').get(protect, getRecipes).post(protect, addRecipe).put(protect, saveRecipe);
router.route('/savedRecipes').get(protect, getSavedRecipes).put(protect, unsaveRecipe);
router.route('/savedRecipes/ids').get(protect, getSavedRecipesIds);
router.route('/:id').get(protect, getRecipe).put(protect, updateRecipe).delete(protect, deleteRecipe);

export default router;