import React, { useState } from 'react';
import SearchByIngredients from './SearchByIngredients';
import RecipeInformation from './RecipeInformation';
import '../index.css';

const RecipeSearchPage = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleRecipeSelect = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  return (
    <div className="RecipeSearchPage">
      <h1>What's in your fridge?</h1>
      <SearchByIngredients onSelectRecipe={handleRecipeSelect} />
      {selectedRecipeId && <RecipeInformation recipeId={selectedRecipeId} />}
    </div>
  );
};

export default RecipeSearchPage;

