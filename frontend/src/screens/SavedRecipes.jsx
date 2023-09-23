import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useGetRecipeQuery, useGetSavedRecipesMutation, useDeleteRecipeMutation } from '../slices/recipeApiSlice';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const SavedRecipes = () => {

    const [savedRecipes, setSavedRecipes] = useState([]);
  
    const [getSavedRecipes, { isLoading }] = useGetSavedRecipesMutation();
  
    useEffect(() => {
        const fetchSavedRecipes = async () => {
          try {
            const res = await getSavedRecipes().unwrap();
            console.log("Saved", res);
            setSavedRecipes(res.savedRecipes);
          } catch (error) {
            toast.error(error?.data?.message || error.error);
          }
        }
    
        fetchSavedRecipes();
        
    }, []);

    const { userInfo } = useSelector((state) => state.auth);

    return (
    <div className='py-5'>
      <div className='d-flex justify-content-center py-4'>
        <h2>{userInfo && userInfo.name}'s Recipes</h2>
        <LinkContainer to='/recipes'>
          <Button variant='primary-outline' className='mx-3 px-3'><FaPlus size={18}/></Button>
        </LinkContainer>
      </div>
     
      <Container className='d-flex justify-content-center'>
      { isLoading && <Loader /> }
        <Row xs={1} sm={1} md={2} lg={3} className='g-4'>
        {savedRecipes?.map((recipe) => {
            return (
              <Col className="d-flex align-items-stretch" key={recipe._id}>
                <RecipeCard content={recipe} />
              </Col>
          )})}
        </Row>
      </Container>
       
    </div>
  );
};

export default SavedRecipes