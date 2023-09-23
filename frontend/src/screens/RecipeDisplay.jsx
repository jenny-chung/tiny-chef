import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetRecipeQuery } from '../slices/recipeApiSlice';
import { CardGroup, Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { timeToHoursAndMinutes } from '../../utils/Helpers';
import { FaPen } from 'react-icons/fa';
import UpdateModal from '../components/UpdateModal';

const RecipeDisplay = () => {

  const { id } = useParams();
  const { data: recipe, isLoading } = useGetRecipeQuery(id);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (id) => {
    navigate(`/updateRecipe/${id}`);
  }

  if (isLoading) return <div>Loading...</div>
  if (!recipe) return <div>Missing recipe!</div>

  return (
    <Card >
      <Card.Title as="h2">{recipe.name}</Card.Title>
      <Card.Subtitle>Total Time: {recipe.timeRequired ? timeToHoursAndMinutes(recipe.timeRequired) : '---'}</Card.Subtitle>
      <Button className='position-absolute top-0 end-0 m-3' variant='primary-outline' onClick={() => handleEdit(recipe._id)}><FaPen /></Button>
      {/* <UpdateModal show={show} handleClose={handleClose}/> */}
      <div className='recipeContainer d-flex flex-row my-4'>
            <Card.Img src={recipe.imageUrl} alt={recipe.name}></Card.Img>
      <Card.Body>
        <Card.Title>Ingredients</Card.Title>
        <ListGroup variant="flush">
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
            )})
        }
        </ListGroup>
      </Card.Body>
      </div>

      <Card.Body>  
      <Card.Title>Instructions</Card.Title>
        <Card.Text>
          {recipe.steps}
        </Card.Text>
      </Card.Body>
    </Card>
  );

};

export default RecipeDisplay;