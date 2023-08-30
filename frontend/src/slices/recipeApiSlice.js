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
        deleteRecipe: builder.mutation({
            query: (id) => ({
                url: `${RECIPES_URL}/${id}`,
                method: 'DELETE',
            })
        }),
        updateRecipe: builder.mutation({
            query: (data) => ({
                url: `${RECIPES_URL}/${id}`,
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