import React, { useState } from 'react';
import { postGlycemicLoad } from './SpoonacularAPI';
import './GlycemicIndexPage.css';
const GlycemicIndexPage = () => {
  const [inputIngredients, setInputIngredients] = useState('');
  const [glycemicLoadData, setGlycemicLoadData] = useState(null);

  const handleInputChange = (e) => {
    setInputIngredients(e.target.value);
  };

  const handleCalculate = async () => {
    if (inputIngredients.trim() === '') return;

    try {
      const ingredientsArray = inputIngredients.split(',').map((ingredient) => ingredient.trim());
      const data = await postGlycemicLoad(ingredientsArray);
      setGlycemicLoadData(data);
    } catch (error) {
      console.error('Error calculating glycemic index:', error);
    }
  };

  return (
    
    <div className="GlycemicIndexPage">
      <h2>Compute Glycemic Index</h2>
      <p>Enter a list of ingredients (comma-separated) to calculate the glycemic index:</p>
      <input type="text" value={inputIngredients} onChange={handleInputChange} />
      <button onClick={handleCalculate}>Calculate</button>

      {glycemicLoadData && (
        <div className="GlycemicLoadResult">
          <h3>Glycemic Load Results:</h3>
          <p>Total Glycemic Load: {glycemicLoadData.totalGlycemicLoad}</p>
          <ul>
            {glycemicLoadData.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.original} - Glycemic Index: {ingredient.glycemicIndex}, Glycemic Load: {ingredient.glycemicLoad}
              </li>
            ))}
          </ul>
        </div>
      )}

      
      <div className="GlycemicImage">
        <img src="https://healthjade.com/wp-content/uploads/2017/04/glycemic-index-chart-1.jpg" alt="Glycemic Index Chart" />
      </div>

      <div className="GlycemicText">
        <h3>What is the Glycemic Index?</h3>
        <h3> 

<p>

The glycemic index or GI ranks carbohydrates according to their effect on blood glucose levels. The lower the GI, the slower the rise in blood glucose levels will be when the food is consumed. The effect may differ from person to person.

Diabetes: There is no one diet or meal plan that works for everyone with diabetes. It is recommended that people with diabetes have moderate amounts of carbohydrate and include high fibre foods that also have a low GI (not all high fibre foods have a low GI). Because the type of carbohydrate can affect blood glucose, using the GI may be helpful in “fine-tuning” blood glucose management. In other words, combined with carbohydrate counting, it may provide an additional benefit for achieving blood glucose goals for individuals who can and want to put extra effort into monitoring their food choices. The amount of carbs you eat has a bigger effect on blood glucose levels than GI alone. For example, pasta has a lower GI than watermelon, but pasta has more carbs than watermelon, so if you eat similar amounts of either of these two foods, the pasta will have more of an impact on your blood glucose levels. The most important thing to do is get your portion size right – once you do this, you will get an added bonus for choosing low-GI alternatives.
</p>
<p>
Meats and fats don’t have a GI because they do not contain carbohydrate.

Some research has shown that by eating a diet with a lower GI, people with diabetes can reduce their average blood glucose levels. This is important in reducing the risk of developing diabetes-related complications.
</p>
<p>
The GI index runs from 0–100 and usually uses glucose, which has a GI of 100, as the reference. Slowly absorbed carbohydrates have a low GI rating (55 or below), and include most fruits and vegetables, milk, some wholegrain cereals and bread, pulses and basmati rice. GI numbers are to be used as a guide only as individual foods do not have the same response in all people with diabetes.   
</p>
        </h3>
      </div>
    </div>
  );
};

export default GlycemicIndexPage;
