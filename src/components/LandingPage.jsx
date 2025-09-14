import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onEnter }) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="welcome-text">
          <h1 className="main-title">The Kitchen Sketch</h1>
          <p className="welcome-message">
            Welcome to your digital recipe collection! Discover, create, and organize your favorite recipes 
            in one beautiful place. Whether you're a seasoned chef or just starting your culinary journey, 
            The Kitchen Sketch is your canvas for culinary creativity.
          </p>
          <p className="sub-message">
            Start sketching your next masterpiece in the kitchen.
          </p>
        </div>
        <button className="enter-button" onClick={onEnter}>
          <span className="button-text">Enter The Kitchen</span>
          <span className="button-icon">🍳</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
