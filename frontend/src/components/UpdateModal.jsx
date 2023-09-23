import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useGetRecipeQuery, useUpdateRecipeMutation } from '../slices/recipeApiSlice';

function UpdateModal({ id, show, handleClose, handleUpdate }) {
    
    const { data: fetchedRecipe, isLoading } = useGetRecipeQuery(id);

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        setRecipe(fetchedRecipe);
    }, [fetchedRecipe]);

    const handleSaveChanges = () => {
      handleUpdate(recipe._id, recipe);
      handleClose();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({...recipe, [name]: value });
    };

    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;

        setRecipe({...recipe, ingredients });
    };

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, '']});
    }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type='text' 
                    placeholder='Update recipe name'
                    name='name'
                    autoFocus
                    value={recipe?.name || ''}
                    onChange={handleChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='ingredients'>
                <Form.Label>Ingredients:</Form.Label>
                <Button onClick={addIngredient} type='button' variant='outline-secondary' className='m-3'>
                    Add ingredient
                </Button>
                {recipe?.ingredients?.map((ingredient, index) => (
                    <Form.Control
                        key={index}
                        type='text'
                        name='ingredients'
                        value={ingredient || ''}
                        onChange={(event) => handleIngredientChange(event, index)}>

                    </Form.Control>
                ))}
            </Form.Group>
            <Form.Group className='mb-3' controlId='Steps'>
                <Form.Label>Steps:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Update recipe steps'
                    name='steps'
                    as="textarea"
                    rows={3}
                    value={recipe?.steps || ''}
                    onChange={handleChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Time required (minutes):</Form.Label>
                <Form.Control
                    type='number'
                    name='timeRequired'
                    min={0}
                    placeholder='Update recipe time (minutes)'
                    value={recipe?.timeRequired || 0}
                    onChange={handleChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image URL:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Update image URL for recipe'
                    name='imageUrl'
                    value={recipe?.imageUrl || ''}
                    onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="customSecondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="customPrimary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default UpdateModal;