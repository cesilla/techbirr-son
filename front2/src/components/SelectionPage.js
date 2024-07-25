import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectionPage.css';

const SelectionPage = () => {
  const navigate = useNavigate();

  const handleTesbihClick = () => {
    navigate('/new-page'); // Navigate to NewPage.js
  };

  const handleNormalClick = () => {
    navigate('/dhikr'); // Navigate to Dhikr.js
  };

  return (
    <div className="selection-container">
      <h1>Select Mode</h1>
      <button className="selection-button" onClick={handleTesbihClick}>
        Tesbih
      </button>
      <button className="selection-button" onClick={handleNormalClick}>
        Normal
      </button>
    </div>
  );
};

export default SelectionPage;
