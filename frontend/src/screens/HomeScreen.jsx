import React from 'react';
import Hero from '../components/Hero';
import RecipeForm from '../components/RecipeForm';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  
  const { userInfo } = useSelector((state) => state.auth);
  console.log("User info", userInfo);

  return (
    <div>
        {userInfo ? <RecipeForm /> : <Hero /> }
    </div>
  );
};

export default HomeScreen;