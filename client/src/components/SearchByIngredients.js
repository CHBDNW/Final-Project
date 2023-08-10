import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'; 

const SearchByIngredients = ({ onSelectRecipe }) => {
  const [ingredientsQuery, setIngredientsQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setIngredientsQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
        params: {
          apiKey: '51d4dad1201847508034ca42d7ad27d4',
          ingredients: ingredientsQuery,
          number: 20,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]);
    }
  };

  const handleRecipeSelect = (recipeId) => {
    onSelectRecipe(recipeId);
  };

  return (
    <div className="SearchByIngredients">
      <p>&nbsp;</p>
      <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
      <input
        type="text"
        placeholder="Search by ingredients..."
        value={ingredientsQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="RecipeGrid">
        {searchResults.map((recipe) => (
          <div className="RecipeBox" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <button onClick={() => handleRecipeSelect(recipe.id)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchByIngredients;
