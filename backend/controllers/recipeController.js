import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import User from '../models/userModel.js';

// @desc    Add a new recipe
// route    POST /api/recipes
// @access  Private
const addRecipe = asyncHandler(async (req, res) => {

    console.log(req.body);

    if (!req.body.name || !req.body.ingredients || !req.body.imageUrl) {
        res.status(400);
        throw new Error('Please fill in the required fields to create a recipe!');
    }

    // const recipe = await Recipe.create({
    //     user: req.user.id,
    //     name: req.body.name,
    //     ingredients: req.body.ingredients,
    //     timeRequired: req.body.timeRequired,
    //     steps: req.body.steps,
    //     imageUrl: req.body.imageUrl
    // });

    const recipe = await Recipe.create({...req.body, user: req.user.id});
    if (recipe) {
        res.status(201).json(recipe);
    } else {
        res.status(400);
        throw new Error('Bad request. Failed to create recipe.')
    }
    
});

const saveRecipe = asyncHandler(async (req, res) => {

    try {
        const recipe = await Recipe.findById(req.body.recipeID);
        const user = await User.findById(req.user.id);

        user.savedRecipes.push(recipe);
        await user.save();

        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.json(error);
    }
});

// @desc    Get specific user recipes
// route    GET /api/recipes
// @access  Private
const getRecipes = asyncHandler(async (req, res) => {
    try {
        console.log(req.user.id);
        const recipes = await Recipe.find({ user: { $all: [req.user.id] } });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400);
        throw new Error('Unable to retrieve user recipes');
    }
});

// @desc    Get specific user saved recipes
// route    GET /api/savedRecipes/ids
// @access  Private
const getSavedRecipes = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ savedRecipes: user?.savedRecipes });
    } catch (error) {
        res.json(error);
    }
});

// @desc    Update a recipe
// route    PUT /api/recipes/:id
// @access  Private
const updateRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        res.status(404);
        throw new Error('Recipe was not found');
    } else {

        // Check if user exists
        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized!');
        }

        // Check that logged in user matches recipe user
        if (recipe.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized!');
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(updatedRecipe);
    }
    
});

// @desc    Delete a recipe
// route    DELETE /api/recipes/:id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
        res.status(404);
        throw new Error('Recipe was not found');
    } else {
       
        // Check if user exists
        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized!');
        }

        // Check that logged in user matches recipe user
        if (recipe.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized!');
        }
        // await Recipe.findByIdAndRemove(req.params.id);
        await recipe.deleteOne();
        res.status(200).json( { message: `Recipe ${req.params.id} deleted` });
    }
    
});

export {
    addRecipe,
    saveRecipe,
    getRecipes,
    getSavedRecipes,
    updateRecipe,
    deleteRecipe
};