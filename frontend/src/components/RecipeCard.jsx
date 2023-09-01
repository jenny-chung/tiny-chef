import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDeleteRecipeMutation } from '../slices/recipeApiSlice';
import { FaRegBookmark } from 'react-icons/fa';

const RecipeCard = ({ content }) => {

  const [deleteRecipe, { isLoading }] = useDeleteRecipeMutation();

  const handleClick = async (id) => {
    console.log("Deleting recipe with id ", id);
        try {
            await deleteRecipe(id).unwrap();
            toast.success("Recipe deleted!");
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
  }

  return (
    // <div className="col-sm-12 mb-3">
    //   <div className="card alert alert-success">
    //     <div className="card-body">
    //       <h5 className="card-name">{content.name}</h5>
    //       <img src={content.imageUrl} width={250} height={300}></img>
    //       <h6>Ingredients</h6>
    //       <h6>Steps</h6>
    //       <p className="card-steps">{content.steps}</p>
    //     </div>
    //     <Button variant='light' size='sm' onClick={handleClick}>Delete</Button>
    //   </div>
    // </div>
    // <div className="col-sm-12 mb-5">
      <Card className='text-center'>
        <Card.Img variant="top" src={content.imageUrl} alt={content.name} />
        <Card.Body>
          <Card.Title>{content.name}</Card.Title>
          <i onClick={() => saveRecipe(content._id)}><FaRegBookmark size={30}/></i>
          <Card.Text>Time Required: {content.timeRequired ? `${content.timeRequired} minutes` : '---'}</Card.Text>
          <Button onClick={() => handleClick(content._id)} variant="warning">Delete</Button>
        </Card.Body>
        <Card.Footer className="text-muted">Added on {content.createdAt.split('T')[0]}</Card.Footer>
      </Card>
    // </div>
  )
}

export default RecipeCard;