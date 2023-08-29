import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import recipeReducer from './slices/recipeSlice';
import { apiSlice } from './slices/apiSlice';

// Create the Redux store
const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
        recipes: recipeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;