import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Ensure this is correctly imported
import './SurahList.css'; // Import the CSS file

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const navigate = useNavigate();
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

  useEffect(() => {
    axios.get('https://api.alquran.cloud/v1/surah')
      .then(response => {
        setSurahs(response.data.data);
      })
      .catch(error => {
        console.error('Sureler alınırken hata oluştu!', error);
      });
  }, []);

  const handleDetail = (surahNumber) => {
    navigate(`/surah-detail/${surahNumber}`);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container">
      <Navbar />
      <h1 className="title">Kuran Sureleri</h1>
      <button className="back-button" onClick={handleBack}>Geri</button>
      <ul className="surah-list">
        {surahs.map(surah => (
          <li key={surah.number} className="surah-item">
            <span className="surah-name">{surah.englishName}</span>
            <button className="surah-button" onClick={() => handleDetail(surah.number)}>Dinle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurahList;
