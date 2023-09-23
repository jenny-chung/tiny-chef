import React from 'react';
import { useState, useEffect } from 'react';
import { CardGroup, Card, Button } from 'react-bootstrap';
import { useGetSavedRecipesIdsMutation, useSaveRecipeMutation, useUnsaveRecipeMutation } from '../slices/recipeApiSlice';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { timeToHoursAndMinutes } from '../../utils/Helpers';
import DeleteConfirm from './DeleteConfirm';
import UpdateModal from './UpdateModal';

const RecipeCard = ({ content, handleDelete, handleUpdate, isHome }) => {

  const navigate = useNavigate();

  const [savedRecipes, setSavedRecipes] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [getSavedRecipes, { isLoading }] = useGetSavedRecipesIdsMutation();
  const [saveRecipe, { }] = useSaveRecipeMutation();
  const [unsaveRecipe, { }] = useUnsaveRecipeMutation();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await getSavedRecipes().unwrap();
        setSavedRecipes(res.savedRecipes);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }

    fetchSavedRecipes();

  }, []);

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  // const handleUpdate = async (id) => {
  //   console.log("Updating recipe with id ", id);
  //   navigate(`/updateRecipe/${id}`);
  //       // try {
  //       //     const res = await deleteRecipe(id).unwrap();
  //       //     console.log("Deleted", res);
  //       //     const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
  //       //     setRecipes(updatedRecipes);

  //       //     toast.success("Recipe deleted!");
  //       // } catch (error) {
  //       //     toast.error(error?.data?.message || error.error);
  //       // }
  // }

  const handleSaveRecipe = async (recipeID) => {
    let res;
    if (isRecipeSaved(recipeID)) {
      // Unsave recipe and change icon
      try {
        res = await unsaveRecipe({recipeID}).unwrap();
        console.log("Unsaving", res);
        setSavedRecipes(res.savedRecipes);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    } else {
      try {
        res = await saveRecipe({recipeID}).unwrap();
        console.log("Saving", res);
        setSavedRecipes(res.savedRecipes);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
      
  };

  const handleCardClick = (id) => {
    navigate(`/recipes/${id}`);
  }


  return (
      <CardGroup>
      <Card className="rc-card d-flex flex-column text-center">
        <Card.Img variant="top" onClick={() => handleCardClick(content._id)} src={content.imageUrl} alt={content.name} />
        {isHome && <i className='saveBtn' title={isRecipeSaved(content._id) ? 'Unsave recipe' : 'Save recipe'} onClick={() => handleSaveRecipe(content._id)}>{isRecipeSaved(content._id) ? <FaBookmark color='lightblue' size={25} /> : <FaRegBookmark color='lightgrey' size={25}/>}</i>}
        <Card.Body className="d-flex flex-column justify-content-end align-items-center">
          <Card.Title>{content.name}</Card.Title>
          <Card.Text>Time Required: {content.timeRequired ? timeToHoursAndMinutes(content.timeRequired) : '---'}</Card.Text>
        <Card.Body className="d-flex flex-row justify-content-end align-items-center">
          {isHome && <Button onClick={() => handleShowUpdate()} variant="warning">Edit</Button>}
          <UpdateModal id={content._id} show={showUpdate} handleClose={handleCloseUpdate} handleUpdate={handleUpdate} />
          {isHome && <Button className='mx-2' onClick={() => handleShow()} variant="danger">Delete</Button>}
          <DeleteConfirm show={show} handleClose={handleClose} recipeId={content._id} handleDelete={handleDelete}/>
        </Card.Body>  
          
        </Card.Body>
        <Card.Footer className="text-muted">Added on {content.createdAt.split('T')[0]}</Card.Footer>
      </Card>
      </CardGroup>
  );
}

export default RecipeCard;