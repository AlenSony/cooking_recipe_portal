
import React, { useState } from 'react';
import './App.css';
import HeroPage from './components/HeroPage';
import LandingPage from './components/LandingPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleEnterKitchen = () => {
    setCurrentPage('hero');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="app-container">
      <video 
        className="background-video" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/background_video_loop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {currentPage === 'landing' && (
        <LandingPage onEnter={handleEnterKitchen} />
      )}
      
      {currentPage === 'hero' && (
        <HeroPage onBack={handleBackToLanding} />
      )}
    </div>
  );
}

export default App
