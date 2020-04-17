import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';
require('dotenv').config();


/**
 * 
 */

const App = () =>{

/**
 * Define API KEY
 */

  const APP_ID = '4f1b4752';
  const API_KEY = process.env.REACT_APP_API_KEY;

  /**
   * Classes: what should i render at what stage of my existence.
   * Hooks: What should the data look like, the render is a by product
   * With hooks you go from controlling your display state to controlling your data shape


   */

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch]= useState("");
  const [query, setQuery]= useState('tomato');

const getRecipes = async () =>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
}

useEffect( () =>{
  getRecipes();
     // eslint-disable-next-line react-hooks/exhaustive-deps
}, [query]);

const updateSearch = e => {
  setSearch(e.target.value);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

  return(
    <div className="App">
<form onSubmit={getSearch} className="search-form">
  <input className="search-bar" 
  type="text" value={search} 
  onChange={updateSearch}>
  </input>
  <button 
  className="search-button" 
  type="submit">
  Search
  </button>
</form>
<div className="recipes">
{recipes.map(recipe =>(
  <Recipe
  key={recipe.id} 
  title={recipe.recipe.label} 
  calories={recipe.recipe.calories}
  image={recipe.recipe.image}
  ingredients={recipe.recipe.ingredients}
  />
))}
</div>
    </div>
  )
}


export default App;
