import React from 'react'
import Hero from '../components/Hero';
import Recipes from './Recipes';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    console.log("User info", userInfo);

  return (
    <div>
        {userInfo ? <Recipes /> : <Hero />}
    </div>
   
  )
}

export default HomeScreen;