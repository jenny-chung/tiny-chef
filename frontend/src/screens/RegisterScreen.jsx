import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                // Set user to local storage and state
                dispatch(setCredentials({...res}));
                navigate('/');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }

    };

    return (
        <FormContainer>
            <h2>Register</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name:* </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your name'
                        value={name}
                        onChange={ (e) => setName(e.target.value) }>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address:* </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your email address'
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password:* </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm password:*</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={ (e) => setConfirmPassword(e.target.value) }>
                    </Form.Control>
                </Form.Group>

            { isLoading && <Loader /> && toast.dismiss() }
            
            <Button type='submit' variant='primary' className='mt-3'>
                Submit
            </Button>

            <Row className='py-3'>
                <Col>
                    Already a user? <Link to='/login'>Login here!</Link>
                </Col>
            </Row>
            
            </Form>
        </FormContainer>
    );
};

export default RegisterScreen;