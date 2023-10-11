import axios from 'axios';

const BASE_URL = 'https://api.spoonacular.com/';
const API_KEY = ;

export async function getRecipeInformation(recipeId) {
  try {
    const response = await axios.get(`${BASE_URL}recipes/${recipeId}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: false,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRecipeNutritionLabel(recipeId) {
  try {
    const response = await axios.get(`${BASE_URL}recipes/${recipeId}/nutritionLabel.png`, {
      params: {
        apiKey: API_KEY,
        showOptionalNutrients: false,
        showZeroValues: false,
        showIngredients: false,
      },
      responseType: 'arraybuffer', 
    });

    const base64Url = await convertToBase64(response.data);
    return base64Url;
  } catch (error) {
    throw error;
  }
}

export async function getRecipeIngredientImage(recipeId) {
  try {
    const response = await axios.get(`${BASE_URL}recipes/${recipeId}/ingredientWidget.png`, {
      params: {
        apiKey: API_KEY,
        measure: 'metric', 
      },
      responseType: 'arraybuffer',
    });

    console.log(response)
    const base64Url = await convertToBase64(response.data);
    return base64Url;
  } catch (error) {
    throw error;
  }
}

export const getChatbotResponse = async (text, contextId) => {
  try {
    const response = await axios.get(`${BASE_URL}/food/converse`, {
      params: {
        apiKey: API_KEY,
        text,
        contextId,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postGlycemicLoad = async (ingredients) => {
    try {
      const response = await axios.post(
        `${BASE_URL}food/ingredients/glycemicLoad`,
        {
          ingredients,
        },
        {
          headers: {
            'Content-Type': 'application/json', 
          },
          params: {
            apiKey: API_KEY,
            language: 'en',
          },
        }
      );
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

  function convertToBase64(binaryData) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      const buffer = new Uint8Array(binaryData);
      fileReader.readAsDataURL(new Blob([buffer]));
    });
  }
