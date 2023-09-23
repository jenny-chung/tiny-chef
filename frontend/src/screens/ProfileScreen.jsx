import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdateProfileMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.setName, userInfo.setEmail]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('Profile updated!');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }

    };

    return (
        <FormContainer>
            <h2>Update your profile</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Update your name'
                        value={name}
                        onChange={ (e) => setName(e.target.value) }>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Update your email address'
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Update your password'
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm your updated password'
                        value={confirmPassword}
                        onChange={ (e) => setConfirmPassword(e.target.value) }>
                    </Form.Control>
                </Form.Group>

            {isLoading && <Loader /> && toast.dismiss()}    
            
            <Button type='submit' variant='primary' className='mt-3'>
                Update
            </Button>
            
            </Form>
        </FormContainer>
    );
};

export default ProfileScreen;