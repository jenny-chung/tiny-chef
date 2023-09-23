import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useGetRecipesMutation, useDeleteRecipeMutation, useUpdateRecipeMutation } from '../slices/recipeApiSlice';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

function Recipes() {

  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  
  const [getRecipes, { isLoading }] = useGetRecipesMutation();
  const [deleteRecipe, { }] = useDeleteRecipeMutation();
  const [updateRecipe, { } ] = useUpdateRecipeMutation();

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const res = await getRecipes().unwrap();
        console.log("Recipes", res);
        setRecipes(res);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }

    fetchAllRecipes();

  }, []);

  const searchInputHandler = (event) => {
    // convert input text to lower case
    let lowerCase = event.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  const handleDelete = async (id) => {
    console.log("Deleting recipe with id ", id);
        try {
            const res = await deleteRecipe(id).unwrap();
            console.log("Deleted", res);
            const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
            setRecipes(updatedRecipes);
            toast.success("Recipe deleted!");
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
  };

  const handleUpdate = async (id, recipe) => {
    console.log("Updating recipe with id ", id);
    try {
        console.log("Recipe", recipe);
        const res = await updateRecipe({id: id, recipe: recipe}).unwrap();
        console.log("Update", res);
        setRecipes(recipes => recipes.map((r) => (r._id === id ? res : r))); 
    } catch (error) {
        toast.error(error?.data?.message || error.error);
    }
  };

  const filteredData = recipes.filter((element) => {
    //if no input the return the original
    if (searchInput === '') {
        return element;
    } else {
        return element.name.toLowerCase().includes(searchInput)
    }
  });

  return (
    <div className='py-5'>
      <div className='d-flex justify-content-center py-4'>
        <h2>Recipes</h2>
        <LinkContainer to='/recipes'>
          <Button variant='outline-primary' className='mx-3 px-3'><FaPlus size={18} /></Button>
        </LinkContainer>
      </div>
      
      <div className="input-group col-md-4">
        <input
            className="form-control border-right-0 border"
            type="search"
            placeholder="Type to search..."
            aria-label="Search"
            id="search-input"
            onChange={(event) => searchInputHandler(event)} />
            <span className="input-group-append">
          <div className="btn border-left-0 border">
            <FaSearch/>
          </div>
        </span>
        
      </div>
      <Container fluid className='d-flex justify-content-center'>
      { isLoading && <Loader /> }
        <Row xs={1} sm={1} md={2} lg={3} className='g-4'>
        {filteredData?.map((recipe) => {
            return (
              <Col 
                className="d-flex align-items-stretch"
                key={recipe._id}>
                <RecipeCard isHome={true} content={recipe} handleDelete={handleDelete} handleUpdate={handleUpdate} />
              </Col>
          )})}
        </Row>
      </Container>
       
    </div>
  );
};

export default Recipes;