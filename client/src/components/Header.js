import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="Header">
      <div className="Header-content">
        <div className="Header-logo">
          <Link to="/">Healthy</Link>
        </div>
        <nav className="Header-nav">
          <ul>
            <li>
              <Link to="/">What's in your fridge?</Link>
            </li>
            <li>
              <Link to="/browse">Browse Recipes</Link>
            </li>
            
            <li>
              <Link to="/image-analysis">Image Analysis</Link>
            </li>            
            <li>
              <Link to="/my-nutrition">My Nutrition</Link>
            </li>
            <li>
              <Link to="/chatbot">Ask Me Anything</Link>
            </li>

            <li>
              <Link to="/compute-glycemic-index">Compute Glycemic Index</Link>
            </li>
            <li>
              <Link to="/cookbook">My Cookbook</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
