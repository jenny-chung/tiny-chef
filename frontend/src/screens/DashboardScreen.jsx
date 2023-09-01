import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useGetRecipesMutation } from '../slices/recipeApiSlice';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';

function DashboardScreen() {

  const [recipes, setRecipes] = useState([]);
  const [getRecipes, { isLoading }] = useGetRecipesMutation();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await getRecipes().unwrap();
        console.log("Recipes", res);
        setRecipes(res);
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
      <h2 className='d-flex justify-content-center pb-3'>{userInfo && userInfo.name}'s Recipe Dashboard</h2>
      <Container className='d-flex justify-content-center'>
      { isLoading && <Loader /> }
        <Row xs={1} md={3} className='g-4'>
        {recipes.map((recipe) => {
            return (
              <Col key={recipe._id}>
                <RecipeCard content={recipe} />
              </Col>
            
          )})}
        </Row>
      
        
        {/* <Form>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
        </Form> */}
       
        
      </Container>
      
    </div>
  );
};

export default DashboardScreen;