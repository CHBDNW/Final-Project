import React from 'react';
import RecipeInformation from './RecipeInformation';
// note to self: display on BROWSE RECIPES tab

const RecipeDetailsPage = ({ match }) => {
  const recipeId = match.params.id;

  return (
    <div>
      <h1>Recipe Details</h1>
      <RecipeInformation recipeId={recipeId} />
    </div>
  );
};

export default RecipeDetailsPage;

