import React, { useState, useEffect } from 'react';

const translations = {
  tr: {
    prayerTimes: "Namaz Vakitleri",
    fajr: "İmsak",
    dhuhr: "Öğle",
    asr: "İkindi",
    maghrib: "Akşam",
    isha: "Yatsı",
    qibla: "Kıble Yönü"
  },
  ar: {
    prayerTimes: "أوقات الصلاة",
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",
    qibla: "اتجاه القبلة"
  },
  fr: {
    prayerTimes: "Heures de prière",
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    qibla: "Direction de la Qibla"
  },
  en: {
    prayerTimes: "Prayer Times",
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    qibla: "Qibla Direction"
  },
  ru: {
    prayerTimes: "Время молитвы",
    fajr: "Фаджр",
    dhuhr: "Зухр",
    asr: "Аср",
    maghrib: "Магриб",
    isha: "Иша",
    qibla: "Направление киблы"
  },
  zh: {
    prayerTimes: "祈祷时间",
    fajr: "晨礼",
    dhuhr: "晌礼",
    asr: "晡礼",
    maghrib: "昏礼",
    isha: "宵礼",
    qibla: "朝向方向"
  },
  de: {
    prayerTimes: "Gebetszeiten",
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    qibla: "Qibla-Richtung"
  },
  kk: {
    prayerTimes: "Намаз уақыты",
    fajr: "Фаджр",
    dhuhr: "Зухр",
    asr: "Аср",
    maghrib: "Магриб",
    isha: "Иша",
    qibla: "Құбыла бағыты"
  },
  az: {
    prayerTimes: "Namaz Vakitleri",
    fajr: "Sübh",
    dhuhr: "Zöhr",
    asr: "Əsr",
    maghrib: "Məğrib",
    isha: "İşa",
    qibla: "Qiblə Yönü"
  }
};

const PrayerTimes = () => {
  const [language, setLanguage] = useState('en');
  const [prayerTimes, setPrayerTimes] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [qiblaDirection, setQiblaDirection] = useState(0);

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(selectedLanguage);
  }, []);

  useEffect(() => {
    fetchPrayerTimes();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleOrientation = (event) => {
      const alpha = event.alpha;
      setQiblaDirection(alpha);
    };
    window.addEventListener('deviceorientation', handleOrientation);

    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=YOUR_LATITUDE&longitude=YOUR_LONGITUDE&method=2`);
      const data = await response.json();
      setPrayerTimes(data.data.timings);
    } catch (error) {
      console.error("Namaz vakitleri alınırken hata oluştu:", error);
    }
  };

  const getNearestPrayer = () => {
    const times = Object.entries(prayerTimes).map(([key, value]) => ({
      name: key,
      time: new Date(currentTime.toDateString() + ' ' + value)
    }));
    const now = new Date();
    const nearest = times.reduce((prev, curr) => (curr.time > now && curr.time < prev.time) ? curr : prev, { time: new Date(now.getTime() + 24 * 60 * 60 * 1000) });
    return nearest.name;
  };

  const nearestPrayer = getNearestPrayer();

  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    },
    prayerTime: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 10,
    },
    highlighted: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 10,
      backgroundColor: '#FFD700',
      padding: '10px',
      borderRadius: '8px',
    },
    qiblaContainer: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    qiblaImage: {
      width: 200,
      height: 200,
      transform: `rotate(${qiblaDirection}deg)`,
    },
    qiblaText: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.prayerTime}>
        {translations[language]?.prayerTimes || "Prayer Times"}
      </div>
      {Object.entries(prayerTimes).map(([key, value]) => (
        <div
          key={key}
          style={key.toLowerCase() === nearestPrayer ? styles.highlighted : styles.prayerTime}
        >
          {translations[language]?.[key.toLowerCase()] || key}: {value}
        </div>
      ))}
      <div style={styles.qiblaContainer}>
        <img src="/qibla-compass.png" alt="Qibla Compass" style={styles.qiblaImage} />
        <div style={styles.qiblaText}>
          {translations[language]?.qibla || "Qibla Direction"}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
