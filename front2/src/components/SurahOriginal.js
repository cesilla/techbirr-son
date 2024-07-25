import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './SurahOriginal.css';

const cleanText = (text) => {
  return text.replace(/<[^>]*>?/gm, '');
};

const translations = {
  previous: {
    en: 'Previous',
    tr: 'Önceki',
    fr: 'Précédent',
    ru: 'Предыдущий',
    zh: '上一个',
    de: 'Vorherige',
    kk: 'Алдыңғы',
    az: 'Əvvəlki',
    ar: 'السابق'
  },
  next: {
    en: 'Next',
    tr: 'Sonraki',
    fr: 'Suivant',
    ru: 'Следующий',
    zh: '下一个',
    de: 'Nächste',
    kk: 'Келесі',
    az: 'Növbəti',
    ar: 'التالي'
  }
};

const SurahOriginal = () => {
  const { surahNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const language = queryParams.get('language') || 'en'; // Default language is English
  const [surah, setSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahDetails = async () => {
      try {
        const surahResponse = await axios.get(`https://api.quran.com/api/v4/chapters/${surahNumber}`);
        setSurah(surahResponse.data.chapter);

        const ayahsResponse = await axios.get(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahNumber}`);
        const cleanedAyahs = ayahsResponse.data.verses.map(ayah => ({
          ...ayah,
          text_uthmani: cleanText(ayah.text_uthmani)
        }));
        setAyahs(cleanedAyahs);

        setLoading(false);
      } catch (error) {
        console.error('Sure bilgileri alınırken hata oluştu!', error);
        setLoading(false);
      }
    };

    fetchSurahDetails();
  }, [surahNumber]);

  const handlePrevious = () => {
    const prevSurahNumber = Math.max(parseInt(surahNumber, 10) - 1, 1);
    navigate(`/surah-original/${prevSurahNumber}?language=${language}`);
  };

  const handleNext = () => {
    const nextSurahNumber = Math.min(parseInt(surahNumber, 10) + 1, 114);
    navigate(`/surah-original/${nextSurahNumber}?language=${language}`);
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (!surah) {
    return <p>Sure bulunamadı</p>;
  }

  return (
    <div className="surah-container">
      <h1 className="surah-title">{surah.name_simple}</h1>
      <p className="surah-translation">{surah.translated_name.name}</p>
      <div className="navigation-buttons">
        <button className="nav-button" onClick={handlePrevious} disabled={parseInt(surahNumber, 10) === 1}>
          {translations.previous[language]}
        </button>
        <button className="nav-button" onClick={handleNext} disabled={parseInt(surahNumber, 10) === 114}>
          {translations.next[language]}
        </button>
      </div>
      <div className="ayahs-container">
        {ayahs.map(ayah => (
          <p key={ayah.verse_key} className="ayah-text">{ayah.text_uthmani}</p>
        ))}
      </div>
    </div>
  );
};

export default SurahOriginal;
