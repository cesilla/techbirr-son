import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SurahList2.css';

const languages = {
  en: 'English',
  fr: 'French',
  ru: 'Russian',
  tr: 'Turkish',
  zh: 'Chinese',
  de: 'German',
  kk: 'Kazakh',
  az: 'Azerbaijani',
  ar: 'Arabic'
};

const mealText = {
  en: 'Translation',
  fr: 'Traduction',
  ru: 'Перевод',
  tr: 'Meal',
  zh: '翻译',
  de: 'Übersetzung',
  kk: 'Аударма',
  az: 'Tərcümə',
  ar: 'الأصل'
};

const SurahList2 = () => {
  const [surahs, setSurahs] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'tr');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://api.quran.com/api/v4/chapters')
      .then(response => {
        setSurahs(response.data.chapters);
      })
      .catch(error => {
        console.error('Sureler alınırken hata oluştu!', error);
      });
  }, []);

  const handleSelection = (surahNumber) => {
    if (language === 'ar') {
      navigate(`/surah-original/${surahNumber}`);
    } else {
      navigate(`/surah-translation/${surahNumber}?language=${language}`);
    }
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    window.location.reload(); // Sayfayı yeniden yükleyerek dil değişikliğini uygula
  };

  return (
    <div className="container">
      <h1 className="title">
        {language === 'tr' ? 'Kuran Sureleri' :
         language === 'en' ? 'Quran Surahs' :
         language === 'fr' ? 'Sourates du Coran' :
         language === 'ru' ? 'Суры Корана' :
         language === 'zh' ? '古兰经章节' :
         language === 'de' ? 'Koran Suren' :
         language === 'kk' ? 'Құран сүрелері' :
         language === 'az' ? 'Quran Sureləri' :
         language === 'ar' ? 'سور القرآن' : 'Quran Surahs'}
      </h1>
      <div className="language-select">
        <label htmlFor="language">{language === 'tr' ? 'Dil Seçin:' :
                                   language === 'en' ? 'Select Language:' :
                                   language === 'fr' ? 'Choisissez la langue:' :
                                   language === 'ru' ? 'Выберите язык:' :
                                   language === 'zh' ? '选择语言:' :
                                   language === 'de' ? 'Sprache wählen:' :
                                   language === 'kk' ? 'Тілді таңдаңыз:' :
                                   language === 'az' ? 'Dil Seçin:' :
                                   language === 'ar' ? 'اختر اللغة:' : 'Select Language:'}
        </label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          {Object.entries(languages).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
          ))}
          <option value="ar">Orijinal (Arabic)</option>
        </select>
      </div>
      <ul className="surah-list">
        {surahs.map(surah => (
          <li key={surah.id} className="surah-item">
            <span className="surah-name">{surah.name_simple}</span>
            <button className="surah-button" onClick={() => handleSelection(surah.id)}>
              {mealText[language]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurahList2;
