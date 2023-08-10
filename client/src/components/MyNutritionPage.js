import React, { useState } from 'react';
import axios from 'axios';
import './MyNutritionPage.css'; 
const MyNutritionPage = () => {
  const [foodItems, setFoodItems] = useState(['']);
  const [nutritionInfo, setNutritionInfo] = useState(null);

  const handleFoodItemChange = (event, index) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index] = event.target.value;
    setFoodItems(updatedFoodItems);
  };

  const handleAddFoodItem = () => {
    setFoodItems([...foodItems, '']);
    setNutritionInfo(null);
  };

  const handleSearchNutrition = async () => {
    try {
      const promises = foodItems.map(async (item) => {
        const response = await axios.post(
          'https://api.spoonacular.com/recipes/parseIngredients',
          `ingredientList=${encodeURIComponent(item)}&servings=1&includeNutrition=true&language=en`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
              apiKey: '51d4dad1201847508034ca42d7ad27d4',
            },
          }
        );
        return response.data[0];
      });

      const results = await Promise.all(promises);

    
      const totalNutrition = results.reduce((total, info) => {
        info.nutrition.nutrients.forEach((nutrient) => {
          if (!total[nutrient.name]) {
            total[nutrient.name] = {
              amount: 0,
              unit: nutrient.unit,
            };
          }
          total[nutrient.name].amount += nutrient.amount;
        });
        return total;
      }, {});

      setNutritionInfo(totalNutrition);
    } catch (error) {
      console.error('Error fetching nutrition information:', error);
      setNutritionInfo(null);
    }
  };

  return (
    <div className="MyNutritionPage">
      <h2>My Nutrition</h2>
      <h3>This tool calculates your meal and returns the nutritional content</h3>
      <div className="SearchBar">
        <button className="AddButton" onClick={handleAddFoodItem}>Add Food Item</button>
        {foodItems.map((item, index) => (
          <div key={index} className="FoodItemInput">
            <input
              type="text"
              value={item}
              onChange={(event) => handleFoodItemChange(event, index)}
              placeholder="Enter a food item..."
            />
          </div>
        ))}
        <button className="SearchButton" onClick={handleSearchNutrition}>Search</button>
      </div>
      <div className="NutritionInfo">
        {nutritionInfo && (
          <div>
            <h3>Total Nutrition Information:</h3>
            <ul>
              {Object.keys(nutritionInfo).map((nutrientName) => (
                <li key={nutrientName}>
                  {nutrientName}: {nutritionInfo[nutrientName].amount} {nutritionInfo[nutrientName].unit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNutritionPage;

