import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    timeRequired: {
        type: Number,
    },
    steps: {
        type: String,
        sparse: true
    },
    imageUrl: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;