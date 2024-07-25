import React, { useEffect, useState } from 'react';
import { getRhumbLineBearing } from 'geolib';
import './KiblaPage.css';

const KiblaPage = () => {
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [error, setError] = useState(null);

  const calculateQiblaDirection = (latitude, longitude) => {
    const mecca = { latitude: 21.4225, longitude: 39.8262 }; // Coordinates of the Kaaba in Mecca
    const direction = getRhumbLineBearing(
      { latitude, longitude },
      mecca
    );
    return direction;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const direction = calculateQiblaDirection(latitude, longitude);
          setQiblaDirection(direction);
        },
        (error) => {
          setError('Error fetching location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  }, []);

  return (
    <div className="qibla-direction">
      {error && <p>{error}</p>}
      {qiblaDirection !== null && (
        <div className="compass-container">
          <img src="/kıble/compass.png" alt="Compass" className="compass" />
          <img
            src="/kıble/arrow.png"
            alt="Arrow"
            className="arrow"
            style={{ transform: `rotate(${qiblaDirection}deg)` }}
          />
        </div>
      )}
    </div>
  );
};

export default KiblaPage;
