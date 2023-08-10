import React from 'react';
// note to self: display on BROWSE RECIPES tab
const RecipeCard = ({ recipe }) => {
  return (
    <div className="RecipeCard">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
    </div>
  );
};

export default RecipeCard;
