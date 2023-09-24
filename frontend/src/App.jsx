import React from 'react';
import Header from './components/Header.jsx';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer limit={3}/>
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;