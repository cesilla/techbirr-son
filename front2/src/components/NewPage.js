import React, { useState } from 'react';
import './NewPage.css';

const NewPage = () => {
  const [count, setCount] = useState(0);
  const [clickedDotIndex, setClickedDotIndex] = useState(null);

  const dots = [
    { x: 260, y: 50 },
    { x: 255, y: 150 },
    { x: 225, y: 250 }
  ];

  const handleDotClick = (index) => {
    setCount(count + 1);
    setClickedDotIndex(index);
    setTimeout(() => setClickedDotIndex(null), 500); // Reset the clicked dot after 0.5 seconds
  };

  return (
    <div className="new-page-container">
      <h1>New Page</h1>
      <p>Dhikr Count: {count}</p>
      <div className="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/zikir/Vector.png`}
          alt="Vector"
          className="clickable-image"
        />
        {dots.map((dot, index) => (
          <img
            key={index}
            src={`${process.env.PUBLIC_URL}/zikir/nokta.png`}
            alt="Dot"
            className={`dot ${clickedDotIndex === index ? 'dot-clicked' : ''}`}
            style={{ left: `${dot.x}px`, top: `${dot.y}px` }}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewPage;
