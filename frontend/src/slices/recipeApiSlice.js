import { apiSlice } from "./apiSlice";
const RECIPES_URL = '/api/recipes';

export const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.mutation({
            query: () => ({
                url: `${RECIPES_URL}`,
                method: 'GET',
            })
            // query: () => `${RECIPES_URL}`,
            // providesTags: ['Recipe']
        }),
        addRecipe: builder.mutation({
            query: (recipe) => ({
                url: `${RECIPES_URL}`,
                method: 'POST',
                body: recipe,
                // formData: true
            })
        }),
        saveRecipe: builder.mutation({
            query: (recipe) => ({
                url: `${RECIPES_URL}`,
                method: 'PUT',
                body: recipe,
                // formData: true
            })
        }),
        unsaveRecipe: builder.mutation({
            query: (recipe) => ({
                url: `${RECIPES_URL}/savedRecipes`,
                method: 'PUT',
                body: recipe,
                // formData: true
            })
        }),
        getSavedRecipes: builder.mutation({
            query: () => ({
                url: `${RECIPES_URL}/savedRecipes`,
                method: 'GET',
            })
            // query: () => `${RECIPES_URL}`,
            // providesTags: ['Recipe']
        }),
        getSavedRecipesIds: builder.mutation({
            query: () => ({
                url: `${RECIPES_URL}/savedRecipes/ids`,
                method: 'GET',
            })
            // query: () => `${RECIPES_URL}`,
            // providesTags: ['Recipe']
        }),
        deleteRecipe: builder.mutation({
            query: (id) => ({
                url: `${RECIPES_URL}/${id}`,
                method: 'DELETE',
            })
        }),
        updateRecipe: builder.mutation({
            query: ({id, recipe}) => ({
                url: `${RECIPES_URL}/${id}`,
                method: 'PUT',
                body: recipe
            }),
            invalidatesTags: ['Recipe']
        }),
        getRecipe: builder.query({
            query: (id) => ({
                url: `${RECIPES_URL}/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: 'Recipe', id }]
            // query: () => `${RECIPES_URL}`,
           
        }),
    })
});

export const { 
    useGetRecipesMutation,
    useAddRecipeMutation,
    useSaveRecipeMutation,
    useUnsaveRecipeMutation,
    useGetSavedRecipesMutation,
    useGetSavedRecipesIdsMutation,
    useDeleteRecipeMutation,
    useUpdateRecipeMutation,
    useGetRecipeQuery,
 } = recipesApiSlice;