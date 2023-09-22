import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { useUpdateRecipeMutation, useGetRecipeQuery } from '../slices/recipeApiSlice';

const UpdateRecipeForm = () => {
    
    const navigate = useNavigate();

    const { id } = useParams();
    const { data: fetchedRecipe, isLoading } = useGetRecipeQuery(id);
    const [updateRecipe, {  }] = useUpdateRecipeMutation();
    
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        setRecipe(fetchedRecipe);
    }, [fetchedRecipe]);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("Recipe", recipe);
            const res = await updateRecipe({id: id, recipe: recipe}).unwrap();
            console.log("Update", res);
            toast.success('Recipe successfully updated!');    
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    const handleView = (id) => {
        navigate(`/recipes/${id}`);
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

    // console.log(recipe);

    return (

        <FormContainer>
        <h2>Update Recipe</h2>
        {isLoading && <Loader />}
        <Form onSubmit={onSubmit}>
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type='text' 
                    placeholder='Update recipe name'
                    name='name'
                    value={recipe.name}
                    onChange={handleChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='ingredients'>
                <Form.Label>Ingredients:</Form.Label>
                <Button onClick={addIngredient} type='button' variant='outline-secondary' className='m-3'>
                    Add ingredient
                </Button>
                {recipe.ingredients?.map((ingredient, index) => (
                    <Form.Control
                        key={index}
                        type='text'
                        name='ingredients'
                        value={ingredient}
                        onChange={(event) => handleIngredientChange(event, index)}>

                    </Form.Control>
                ))}
            </Form.Group>
            <Form.Group className='my-2' controlId='Steps'>
                <Form.Label>Steps:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Update recipe steps'
                    name='steps'
                    as="textarea"
                    rows={5}
                    value={recipe.steps}
                    onChange={handleChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Time required (minutes):</Form.Label>
                <Form.Control
                    type='number'
                    name='timeRequired'
                    min={0}
                    placeholder='Update recipe time (minutes)'
                    value={recipe.timeRequired}
                    onChange={handleChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image URL:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Update image URL for recipe'
                    name='imageUrl'
                    value={recipe.imageUrl}
                    onChange={handleChange} />
            </Form.Group>
        
        <Col>
            <Button type='submit' variant='primary' className='mt-3'>
            Update recipe
        </Button>
        <Button onClick={() => handleView(recipe._id)} variant='info' className='mt-3'>
            View recipe
        </Button>
        </Col>
        
        
        </Form>
    </FormContainer>
    );
};

export default UpdateRecipeForm;