import { apiSlice } from "./apiSlice";
const RECIPES_URL = '/api/recipes';

export const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.mutation({
            query: () => ({
                url: `${RECIPES_URL}`,
                method: 'GET',
            })
        }),
        addRecipe: builder.mutation({
            query: (recipe) => ({
                url: `${RECIPES_URL}`,
                method: 'POST',
                body: recipe,
                // formData: true
            })
        }),
        deleteRecipe: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/delete`,
                method: 'POST',
                body: data
            })
        }),
        updateRecipe: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
    })
});

export const { 
    useGetRecipesMutation,
    useAddRecipeMutation,
    useDeleteRecipeMutation,
    useUpdateRecipeMutation
 } = recipesApiSlice;