import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('https://tiny-chef.onrender.com')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  },[]);

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