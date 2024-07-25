import React, { useState } from 'react';
import './HatimPaylas.css';

const HatimPaylas = ({ onAddHatim }) => {
  const [hatimText, setHatimText] = useState('');

  const handleAddHatim = () => {
    if (hatimText.trim()) {
      onAddHatim(hatimText);
      setHatimText('');
    }
  };

  return (
    <div className="hatim-paylas">
      <h3>Hatim Paylaş</h3>
      <input
        type="text"
        value={hatimText}
        onChange={(e) => setHatimText(e.target.value)}
        placeholder="Hatim paylaşımını girin"
      />
      <button onClick={handleAddHatim}>Paylaş</button>
    </div>
  );
};

export default HatimPaylas;
