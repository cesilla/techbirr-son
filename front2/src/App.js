import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
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

    const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;

    const setWebhook = async () => {
      const url = `https://api.telegram.org/bot${botToken}/setWebhook?url=https://main--lustrous-mousse-6b5222.netlify.app/`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error setting webhook:', error);
      }
    };

    setWebhook();
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
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "tonwallet",
            name: "TON Wallet",
            imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
            aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
            universalLink: "https://wallet.ton.org/ton-connect",
            jsBridgeKey: "tonwallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "android"]
          },
          {
            appName: "nicegramWallet",
            name: "Nicegram Wallet",
            imageUrl: "https://static.nicegram.app/icon.png",
            aboutUrl: "https://nicegram.app",
            universalLink: "https://nicegram.app/tc",
            deepLink: "nicegram-tc://",
            jsBridgeKey: "nicegramWallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["ios", "android"]
          },
          {
            appName: "binanceTonWeb3Wallet",
            name: "Binance Web3 Wallet",
            imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMEIwRTExIi8+CjxwYXRoIGQ9Ik01IDE1TDcuMjU4MDYgMTIuNzQxOUw5LjUxNjEzIDE1TDcuMjU4MDYgMTcuMjU4MUw1IDE1WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNOC44NzA5NyAxMS4xMjlMMTUgNUwyMS4xMjkgMTEuMTI5TDE4Ljg3MSAxMy4zODcxTDE1IDkuNTE2MTNMMTEuMTI5IDEzLjM4NzFMOC44NzA5NyAxMS4xMjlMMTMuMzg3MSAxMy4zODcxIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMi43NDE5IDE1TDE1IDEyLjc0MTlMMTcuMjU4MSAxNUwxNSAxNy4yNTgxTDEyLjc0MTkgMTVaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMS4xMjkgMTYuNjEyOUw4Ljg3MDk3IDE4Ljg3MUwxNSAyNUwyMS4xMjkgMTguODcxTDE4Ljg3MSAxNi42MTI5TDE1IDIwLjQ4MzlMMTEuMTI5IDE2LjYxMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0yMC40ODM5IDE1TDIyLjc0MTkgMTIuNzQxOUwyNSAxNUwyMi43NDE5IDE3LjI1ODFMMjAuNDgzOSAxNVoiIGZpbGw9IiNGMEI5MEIiLz4KPC9zdmc+Cg==",
            aboutUrl: "https://www.binance.com/en/web3wallet",
            deepLink: "bnc://app.binance.com/cedefi/ton-connect",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "safari", "ios", "android"],
            universalLink: "https://app.binance.com/cedefi/ton-connect"
          }
        ]
      }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/TechBirr_bot'
      }}
    >
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
    </TonConnectUIProvider>
  );
}

export default App;
