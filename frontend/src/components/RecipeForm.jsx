import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useAddRecipeMutation } from '../slices/recipeApiSlice';

const RecipeForm = () => {

    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: [],
        steps: '',
        imageUrl: '',
        timeRequired: 0,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addRecipe, { isLoading }] = useAddRecipeMutation();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await addRecipe(recipe).unwrap();
            console.log("Result", res);
            toast.success('Recipe added!');
            navigate('/')
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
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
        <h2>Create Recipe</h2>
        <Form onSubmit={onSubmit}>
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type='text' 
                    placeholder='Enter recipe name'
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
                {recipe.ingredients.map((ingredient, index) => (
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
                    placeholder='Enter recipe steps'
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
                    placeholder='Enter recipe time (minutes)'
                    value={recipe.timeRequired}
                    onChange={handleChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image URL:</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter image URL for recipe'
                    name='imageUrl'
                    value={recipe.imageUrl}
                    onChange={handleChange} />
            </Form.Group>
        
        <Button type='submit' variant='primary' className='mt-3'>
            Add recipe
        </Button>

        {/* <Row className='py-3'>
            <Col>
                New user?
            </Col>
        </Row> */}
        
        </Form>
    </FormContainer>
    );
};

export default RecipeForm;