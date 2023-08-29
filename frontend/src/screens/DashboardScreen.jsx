import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useGetRecipesMutation } from '../slices/recipeApiSlice';

function DashboardScreen() {

  const [recipes, setRecipes] = useState([]);
  const [getRecipes, { isLoading }] = useGetRecipesMutation();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await getRecipes().unwrap();
        console.log("Result", res);
        setRecipes(res.data);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }

    fetchRecipes();

  }, []);

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        {/* <h2>Welcome {userInfo && userInfo.name}</h2> */}
        <h2>Recipe Dashboard</h2>
      </Container>
      {/* <RecipeForm /> */}
    </div>
  );
};

export default DashboardScreen;