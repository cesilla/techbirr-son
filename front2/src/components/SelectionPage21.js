import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectionPage2.css';

const SelectionPage2 = () => {
  const navigate = useNavigate();

  const handleReadClick = () => {
    navigate('/surahpage2');
  };

  const handleListenClick = () => {
    navigate('/surahpage');
  };

  return (
    <div className="selection-page2">
      <h1>Select an Option</h1>
      <button className="selection-button" onClick={handleReadClick}>
        Quran Read
      </button>
      <button className="selection-button" onClick={handleListenClick}>
        Quran Listen
      </button>
    </div>
  );
};

export default SelectionPage2;
