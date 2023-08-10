import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import '../browseRecipesPage.css'; 

const BrowseRecipesPage = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  useEffect(() => {
    const searchResults = randomRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRecipes(searchResults);
  }, [searchText, randomRecipes]);

  const fetchRandomRecipes = async () => {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/random', {
        params: {
          apiKey: '51d4dad1201847508034ca42d7ad27d4',
          number: 20,
        },
      });
      setRandomRecipes(response.data.recipes);
      setFilteredRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
    }
  };

  const handleSearchTextChange = async (event) => {
    const query = event.target.value;
    setSearchText(query);

    if (query.trim() === '') {
      setFilteredRecipes(randomRecipes);
      return;
    }

    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: '51d4dad1201847508034ca42d7ad27d4',
          query,
          number: 20,
        },
      });
      setFilteredRecipes(response.data.results);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <div className="BrowseRecipesPage">
      <h1>Browse Recipes</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search by recipe name..."
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <p className="search-hint">
          Search by name, ingredient, dietary restriction, meal type, etc...
        </p>
      </div>
      <div className="RecipeGrid">
        {filteredRecipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseRecipesPage;
