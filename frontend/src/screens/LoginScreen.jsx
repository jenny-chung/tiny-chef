import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setPasswordVisibility] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            // Set user to local storage and state
            dispatch(setCredentials({...res}));
            navigate('/');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    const togglePasswordVisibility = () => {
       setPasswordVisibility(showPassword ? false : true);
    }

    return (
        <FormContainer>
            <h2>Login</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your email address'
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }>
                    
                    </Form.Control>
                    <i title={showPassword ? 'Hide password' : 'Show password'} onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</i>
                </Form.Group>

            { isLoading && <Loader /> && toast.dismiss() }
            
            <Button type='submit' variant='customPrimary' className='mt-3'>
                Login
            </Button>

            <Row className='py-3'>
                <Col>
                    New user? <Link to='/register'>Register here!</Link>
                </Col>
            </Row>
            
            </Form>
        </FormContainer>
    );
};

export default LoginScreen;