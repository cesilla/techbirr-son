import React, { useState } from 'react';
import Modal from './Modal';
import './AllahIsimleri.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const imageCount = 99; // Total number of images

const meanings = [
  'The Beneficent', 'The Merciful', 'The King', 'The Most Sacred', 'The Source of Peace', 'The Guarantor',
  'The Guardian', 'The Almighty', 'The Compeller', 'The Supreme', 'The Creator', 'The Evolver',
  'The Fashioner', 'The Repeatedly Forgiving', 'The All-Subduer', 'The Bestower', 'The Provider',
  'The Opener', 'The All-Knowing', 'The Withholder', 'The Extender', 'The Reducer', 'The Exalter',
  'The Honorer', 'The Dishonorer', 'The All-Hearing', 'The All-Seeing', 'The Judge', 'The Utterly Just',
  'The Subtle One', 'The Acquainted', 'The Forbearing', 'The Magnificent', 'The Great Forgiver',
  'The Most Appreciative', 'The Most High', 'The Most Great', 'The Preserver', 'The Sustainer',
  'The Reckoner', 'The Majestic', 'The Generous', 'The Watchful', 'The Responsive', 'The All-Encompassing',
  'The All-Wise', 'The Most Loving', 'The Glorious', 'The Resurrector', 'The Witness', 'The Truth',
  'The Trustee', 'The All-Strong', 'The Firm', 'The Protecting Associate', 'The Praiseworthy',
  'The Accounter', 'The Originator', 'The Restorer', 'The Giver of Life', 'The Creator of Death',
  'The Ever-Living', 'The Sustainer', 'The Perceiver', 'The Illustrious', 'The One', 'The Eternal',
  'The Omnipotent', 'The Determiner', 'The Expediter', 'The Delayer', 'The First', 'The Last',
  'The Manifest', 'The Hidden', 'The Sole Governor', 'The Self Exalted', 'The Source of All Goodness',
  'The Ever-Pardoning', 'The Avenger', 'The Pardoner', 'The Most Kind', 'Master of the Kingdom',
  'Possessor of Glory and Honor', 'The Just One', 'The Gatherer', 'The Self-Sufficient', 'The Enricher',
  'The Withholder', 'The Creator of The Harmful', 'The Creator of Good', 'The Light', 'The Guide',
  'The Incomparable', 'The Ever-Surviving', 'The Inheritor', 'The Righteous Teacher', 'The Patient'
];

const AllahIsimleri = () => {
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = (index) => {
    setSelectedMeaning(meanings[index]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBackClick = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="allah-isimleri-page">
      <button className="back-button" onClick={handleBackClick}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <div className="images-container">
        {Array.from({ length: imageCount }, (_, index) => (
          <img
            key={index}
            src={`/allahınisimleri/${imageCount - index}.png`}
            alt={`${imageCount - index}`}
            className={`logo ${index === 1 ? 'logo-large' : ''}`} // Special class for the second image
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        <h2>Meaning</h2>
        <p>{selectedMeaning}</p>
      </Modal>
    </div>
  );
};

export default AllahIsimleri;
