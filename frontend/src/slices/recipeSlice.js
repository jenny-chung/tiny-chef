import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recipes: [],
};

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;