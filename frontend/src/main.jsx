import React from 'react';
import ReactDOM from 'react-dom';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import RecipeForm from './components/RecipeForm.jsx';
import UpdateRecipe from './components/UpdateRecipe.jsx';
import RecipeDisplay from './screens/RecipeDisplay.jsx';
import SavedRecipes from './screens/SavedRecipes.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/recipes' element={<RecipeForm />} />
        <Route path='/recipes/:id' element={<RecipeDisplay />} />
        <Route path='/updateRecipe/:id' element={<UpdateRecipe />} />
        <Route path='/myRecipes' element={<SavedRecipes />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
);
