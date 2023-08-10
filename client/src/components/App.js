import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import RecipeSearchPage from './RecipeSearchPage';
import BrowseRecipesPage from './BrowseRecipesPage';
import MyCookbookPage from './MyCookbookPage';
import RecipeDetailsPage from './RecipeDetailsPage';
import MyNutritionPage from './MyNutritionPage'; 
import ImageAnalysisPage from './ImageAnalysisPage';
import ChatbotPage from './ChatbotPage'; 
import GlycemicIndexPage from './GlycemicIndexPage';
import '../index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route path="/" exact component={RecipeSearchPage} />
        <Route path="/browse" component={BrowseRecipesPage} />
        <Route path="/compute-glycemic-index" component={GlycemicIndexPage} />
        <Route path="/recipe/:id" component={RecipeDetailsPage} />
        <Route path="/my-nutrition" component={MyNutritionPage} /> 
        <Route path="/image-analysis" component={ImageAnalysisPage} />
        <Route path="/chatbot" component={ChatbotPage} /> 
        <Route path="/cookbook" component={MyCookbookPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
