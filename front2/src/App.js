import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import WalletConnector from './components/WalletConnector';
import Kayit from './components/Kayit';
import MainPage from './components/MainPage';
import PrayerTimes from './components/PrayerTimes';
import DailyPrayers from './components/DailyPrayers';
import Hadiths from './components/Hadiths';
import Dhikr from './components/Dhikr';
import NamesOfAllah from './components/AllahIsimleri';
import Sacrifice from './components/Sacrifice';
import NonVisualization from './components/NonVisualization';
import DAO from './components/DAO';
import SurahList2 from './components/SurahList2';
import SurahTranslation from './components/SurahTranslation';
import SurahOriginal from './components/SurahOriginal';
import ProfilePage from './components/ProfilePage';
import NavBar from './components/Navbar';
import ToDoList from './components/ToDoList';
import NewPage from './components/NewPage';
import CalendarPage from './components/Calendar';
import SelectionPage from './components/SelectionPage';
import KiblaPage from './components/KiblaPage';
import SelectionPage2 from './components/SelectionPage21';
import './App.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(localStorage.getItem('walletConnected') === 'true');
  const [languageSelected, setLanguageSelected] = useState(localStorage.getItem('selectedLanguage') !== null);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  }, []);

  const handleWalletConnection = () => {
    setWalletConnected(true);
    localStorage.setItem('walletConnected', 'true');
  };

  const handleLanguageSelection = (language) => {
    setLanguageSelected(true);
    localStorage.setItem('selectedLanguage', language);
  };

  return (
    <Router>
      <div className="App">
        {walletConnected && languageSelected && <NavBar />}
        <Routes>
          <Route path="/wallet" element={<WalletConnector onConnectWallet={handleWalletConnection} />} />
          <Route path="/kayit" element={<Kayit onSelectLanguage={handleLanguageSelection} />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/prayer-times" element={<PrayerTimes />} />
          <Route path="/daily-prayers" element={<DailyPrayers />} />
          <Route path="/hadiths" element={<Hadiths />} />
          <Route path="/dhikr" element={<Dhikr />} />
          <Route path="/names-of-allah" element={<NamesOfAllah />} />
          <Route path="/quran-verses" element={<SurahList2 />} />
          <Route path="/surah-translation/:surahNumber" element={<SurahTranslation />} />
          <Route path="/sacrifice" element={<Sacrifice />} />
          <Route path="/non-visualization" element={<NonVisualization />} />
          <Route path="/dao" element={<DAO />} />
          <Route path="/surah-original/:surahNumber" element={<SurahOriginal />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/todo-list" element={<ToDoList />} />
          <Route path="/new-page" element={<NewPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/selection" element={<SelectionPage />} />
          <Route path="/kibla" element={<KiblaPage />} />
          <Route path="/selection21" element={<SelectionPage2 />} /> {/* Selection Page 2 route */}
          <Route
            path="/"
            element={
              !languageSelected ? (
                <Navigate to="/kayit" />
              ) : !walletConnected ? (
                <Navigate to="/wallet" />
              ) : (
                <Navigate to="/main" />
              )
            }
          />
        </Routes>
        <header className="App-header">
          <p>{data}</p>
        </header>
      </div>
    </Router>
  );
}

export default App;
