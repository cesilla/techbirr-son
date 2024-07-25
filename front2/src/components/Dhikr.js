import React, { useState, useEffect } from 'react';
import './Dhikr.css';
import Navbar from './Navbar';
import Confetti from 'react-confetti';

const translations = {
  tr: {
    count: "Sayı",
    setTarget: "Zikir Hedefi Koy",
    targetReached: "Hedefe Ulaşıldı!"
  },
  ar: {
    count: "عدد",
    setTarget: "تعيين الهدف",
    targetReached: "وصلت إلى الهدف!"
  },
  fr: {
    count: "Nombre",
    setTarget: "Définir l'objectif",
    targetReached: "Objectif atteint!"
  },
  en: {
    count: "Count",
    setTarget: "Set Dhikr Target",
    targetReached: "Target Reached!"
  },
  ru: {
    count: "Число",
    setTarget: "Установить цель",
    targetReached: "Цель достигнута!"
  },
  zh: {
    count: "计数",
    setTarget: "设定目标",
    targetReached: "目标达成!"
  },
  de: {
    count: "Anzahl",
    setTarget: "Ziel setzen",
    targetReached: "Ziel erreicht!"
  },
};

const Dhikr = () => {
  const [language, setLanguage] = useState('en');
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(selectedLanguage);
  }, []);

  const handleDhikrClick = () => {
    if (target === null || count < target) {
      const newCount = count + 1;
      setCount(newCount);
      if (navigator.vibrate) {
        navigator.vibrate(200); // Vibrate the device
      }
      if (target !== null) {
        const newPercentage = (newCount / target) * 100;
        setPercentage(newPercentage);
        if (newCount >= target) {
          setTargetReached(true);
          setTimeout(() => setTargetReached(false), 5000); // Hide confetti effect after 5 seconds
        }
      }
    }
  };

  const handleSetTarget = () => {
    const userTarget = parseInt(prompt("Enter your Dhikr target:", ""), 10);
    if (!isNaN(userTarget) && userTarget > 0) {
      setTarget(userTarget);
      setCount(0);
      setPercentage(0);
      setTargetReached(false);
    }
  };

  return (
    <div className="container">
      <Navbar />
      {targetReached && <Confetti numberOfPieces={200} recycle={false} />}
      <div className="content">
        <button className="button" onClick={handleSetTarget}>
          <span className="buttonText">
            {translations[language]?.setTarget || "Set Dhikr Target"}
          </span>
        </button>
        <div className="totalCount">
          {translations[language]?.count || "Count"}: {count}
        </div>
        {target !== null && (
          <div className="targetContainer">
            <svg className="progressCircle" viewBox="0 0 100 100">
              <circle className="bgCircle" cx="50" cy="50" r="45" />
              <circle
                className="fgCircle"
                cx="50"
                cy="50"
                r="45"
                style={{ strokeDasharray: `${percentage * 2.83} 283` }}
              />
              <text className="circleText" x="50" y="55">{count}/{target}</text>
            </svg>
          </div>
        )}
        <button className="button" onClick={handleDhikrClick}>
          <span className="buttonText">Dhikr</span>
        </button>
      </div>
    </div>
  );
};

export default Dhikr;
