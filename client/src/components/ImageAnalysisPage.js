import React, { useState } from 'react';
import axios from 'axios';

const ImageAnalysisPage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleAnalyzeImage = async () => {
    try {
      const encodedImageUrl = encodeURIComponent(imageUrl); 
      const response = await axios.get('https://api.spoonacular.com/food/images/analyze', {
        params: {
          apiKey: '51d4dad1201847508034ca42d7ad27d4', 
          imageUrl: encodedImageUrl,
        },
      });

      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysisResult(null);
    }
  };

  return (
    <div className="ImageAnalysisPage">
      <h2>Image Analysis</h2>
      <h2>Paste a URL link to a photo of food!</h2>
      <div>
        <label htmlFor="imageUrl">Image URL:</label>
        <input type="text" id="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
        <button onClick={handleAnalyzeImage}>Analyze</button>
      </div>
      {analysisResult && (
        <div>
          <h3>Analysis Result:</h3>
          <p>Category: {analysisResult.category.name}</p>
          <p>Probability: {analysisResult.category.probability}</p>
          <h4>Recipes:</h4>
          <ul>
            {analysisResult.recipes.map((recipe) => (
              <li key={recipe.id}>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  {recipe.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysisPage;

