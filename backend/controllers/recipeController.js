import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';
import User from '../models/userModel.js';

// @desc    Add a new recipe
// route    POST /api/recipes
// @access  Private
const addRecipe = asyncHandler(async (req, res) => {

    // console.log(req.body);

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

// @desc    Save a recipe
// route    PUT /api/recipes
// @access  Private
const saveRecipe = asyncHandler(async (req, res) => {

    try {
        const recipe = await Recipe.findById(req.body.recipeID);
        console.log("Recipe Saved: ", recipe);
        const user = await User.findById(req.user.id);

        // Only save recipe if not already in user's list of saved recipes
        if (!user.savedRecipes.includes(recipe._id)) {
            user.savedRecipes.push(recipe);
            await user.save();
        }
        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.status(400);
        throw new Error('Bad request. Failed to save recipe.')
    }
});

// @desc    Unsave a recipe
// route    PUT /api/recipes/savedRecipes
// @access  Private
const unsaveRecipe = asyncHandler(async (req, res) => {

    try {
        console.log(req.body.recipeID)
        const recipe = await Recipe.findById(req.body.recipeID);
        const user = await User.findById(req.user.id);
        
        const index = user.savedRecipes.indexOf(recipe._id);

        if (index > -1) {
            user.savedRecipes.splice(index, 1);
            await user.save();
        }
        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.status(400);
        throw new Error('Bad request. Failed to remove recipe from saves.')
    }
});

// @desc    Get all specific user recipes
// route    GET /api/recipes
// @access  Private
const getRecipes = asyncHandler(async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: { $all: [req.user.id] } });
        // const recipes = await Recipe.find({ name: { $regex: SearchBar, $options: 'i'} });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400);
        throw new Error('Unable to retrieve user recipes');
    }
});

// @desc    Get a specific user recipe
// route    GET /api/recipes/:id
// @access  Private
const getRecipe = asyncHandler(async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400);
        console.log(error);
        throw new Error('Unable to retrieve recipe by ID');
    }
});

// @desc    Get specific user saved recipes
// route    GET /api/recipes/savedRecipes
// @access  Private
const getSavedRecipes = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const savedRecipes = await Recipe.find({
            _id: { $in: user.savedRecipes},
        });
        res.status(200).json({ savedRecipes });
    } catch (error) {
        res.status(400);
        throw new Error('Unable to retrieve user saved recipes')
    }
});

// @desc    Get ids of specific user saved recipes
// route    GET /api/recipes/savedRecipes/ids
// @access  Private
const getSavedRecipesIds = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ savedRecipes: user?.savedRecipes });
    } catch (error) {
        res.status(400);
        throw new Error('Unable to retrieve user saved recipes')
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
        console.log(req.body);
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
        
        const del = await recipe.deleteOne();
        console.log("Delete API", del);
        res.status(200).json( {  message: `Recipe ${req.params.id} deleted` });
    }
    
});

export {
    addRecipe,
    saveRecipe,
    unsaveRecipe,
    getRecipes,
    getRecipe,
    getSavedRecipes,
    getSavedRecipesIds,
    updateRecipe,
    deleteRecipe
};