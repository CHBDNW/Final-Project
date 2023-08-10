import React, { useEffect, useState } from 'react';
import {
  getRecipeInformation,
  getRecipeNutritionLabel,
  getRecipeIngredientImage
} from './SpoonacularAPI';
import '../index.css';

const RecipeInformation = ({ recipeId }) => {
  const [recipeData, setRecipeData] = useState(null);
  const [nutritionLabel, setNutritionLabel] = useState(null);
  const [ingredientImage, setIngredientImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipeInformation(recipeId);
        setRecipeData(data);

        const nutritionLabelImage = await getRecipeNutritionLabel(recipeId);
        setNutritionLabel(nutritionLabelImage);

        const image = await getRecipeIngredientImage(recipeId);
        setIngredientImage(image);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe information:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [recipeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipeData) {
    return <div>Recipe not found!</div>;
  }

  const dietCompatibility = recipeData.diets ? recipeData.diets.join(', ') : 'Not specified';
  const removeHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };
  const strippedInstructions = removeHtmlTags(recipeData.instructions);
  const strippedSummary = removeHtmlTags(recipeData.summary);

  return (
    <div className="RecipeInformation-box">
      <h2>{recipeData.title}</h2>
      <img
    src={recipeData.image}
    alt={recipeData.title}
    style={{ maxWidth: '100%', height: 'auto' }}
  />
<p>&nbsp;</p>
<p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>Ready in {recipeData.readyInMinutes} minutes</p>
<p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>Health Score: {recipeData.healthScore}</p>
<div style={{ textAlign: 'center' }}>
<p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>{recipeData.cuisines ? `Commonly found in ${recipeData.cuisines.join(', ')} cuisines` : 'Not specified'}</p>
</div>
<p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>Dairy Free: {recipeData.dairyFree ? 'Yes' : 'No'}</p>
<p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>Gluten Free: {recipeData.glutenFree ? 'Yes' : 'No'}</p>
<p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>Vegan: {recipeData.vegan ? 'Yes' : 'No'}</p>
<p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>Vegetarian: {recipeData.vegetarian ? 'Yes' : 'No'}</p>
<p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>Low FODMAP: {recipeData.lowFodmap ? 'Yes' : 'No'}</p>
<div style={{ textAlign: 'center' }}>
<p style={{ fontSize: '26px', fontFamily: 'Helvetica, sans-serif', fontStyle: 'italic' }}>{`Compatible with ${dietCompatibility} diets`}</p>
</div>
<p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>Likes: {recipeData.aggregateLikes}</p>
<p>&nbsp;</p>
<p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>{strippedSummary}</p>
<p>&nbsp;</p>
<h3 style={{ fontSize: '26px', fontFamily: 'Helvetica, sans-serif', textAlign: 'center' }}>Ingredients:</h3>
<ul style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>
  {recipeData.extendedIngredients.map((ingredient) => (
    <li key={ingredient.id}>{ingredient.original}</li>
  ))}
</ul>


      {ingredientImage && (
        <div className="IngredientImage" style={{ textAlign: 'center' }}>
          
          <img
            src={ingredientImage}
            alt="Ingredients"
            style={{ maxWidth: '80%', height: 'auto' }}
          />
        </div>
      )}

      {nutritionLabel && (
        <div className="NutritionLabel">
          
          <img
            src={nutritionLabel}
            alt="Nutrition Label"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
      <p>&nbsp;</p>
      <h3>Instructions:</h3>
      <p>
        <span style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '1.2em' }}>
    {strippedInstructions}
        </span>
      </p>  
      <p>&nbsp;</p>
      {recipeData.winePairing && (
        <div>
          <h3 style={{ textAlign: 'center' }}>Wine Pairing:</h3>
          <div style={{ textAlign: 'center' }}>
  <p style={{ fontSize: '22px', fontFamily: 'Helvetica, sans-serif' }}>
    {recipeData.winePairing.pairingText}
  </p>
</div>
<p style={{ textAlign: 'center' }}>Product matches:</p>
<ul style={{ textAlign: 'center', listStylePosition: 'inside' }}>
      {recipeData.winePairing.productMatches.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  </div>
      )}

      <p>Very Popular: {recipeData.veryPopular ? 'Yes' : 'No'}</p>
      <p>
        {' '}
        <a href={recipeData.sourceUrl} target="_blank" rel="noopener noreferrer">
          {recipeData.sourceUrl}
        </a>
      </p>
      <p>Servings: {recipeData.servings}</p>
      <p>Health Score: {recipeData.healthScore}</p>
    </div>
  );
};

export default RecipeInformation;
