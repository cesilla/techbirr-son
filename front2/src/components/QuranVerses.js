import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurahList from './SurahList';
import SurahDetail from './SurahDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SurahList />} />
        <Route path="/surah/:surahNumber" element={<SurahDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
