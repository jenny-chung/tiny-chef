import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetRecipeQuery } from '../slices/recipeApiSlice';
import { CardGroup, Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { timeToHoursAndMinutes } from '../../utils/helpers';

const RecipeDisplay = () => {

  const { id } = useParams();
  const { data: recipe, isLoading } = useGetRecipeQuery(id);

  if (isLoading) return <div>Loading...</div>
  if (!recipe) return <div>Missing recipe!</div>

  return (
    <Card >
      <Card.Title as="h2">{recipe.name}</Card.Title>
      <Card.Subtitle>Total Time: {recipe.timeRequired ? timeToHoursAndMinutes(recipe.timeRequired) : '---'}</Card.Subtitle>
      <div className='d-flex flex-row my-4'>
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