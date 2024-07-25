import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [xp, setXp] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [prayersRead, setPrayersRead] = useState(0);
  const [zikirs, setZikirs] = useState(0);
  const [library, setLibrary] = useState([]);
  const [error, setError] = useState(null);
  const language = localStorage.getItem('selectedLanguage') || 'en';

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Placeholder URLs, replace with actual API endpoints
        const xpResponse = await axios.get('/api/xp');
        const walletResponse = await axios.get('/api/wallet');
        const prayersResponse = await axios.get('/api/prayers');
        const zikirsResponse = await axios.get('/api/zikirs');
        const libraryResponse = await axios.get('/api/library');

        setXp(xpResponse.data.totalXp);
        setWalletAddress(walletResponse.data.address);
        setPrayersRead(prayersResponse.data.count);
        setZikirs(zikirsResponse.data.count);
        setLibrary(libraryResponse.data.books);
      } catch (error) {
        setError('Error fetching profile data');
        console.error('Profile Data Error:', error);
      }
    };

    fetchProfileData();
  }, [language]);

  return (
    <div className="profile-page">
      {error && <p>{error}</p>}
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-info">
        <h2>Total XP: <span>{xp}</span></h2>
        <h2>Wallet Address: <span>{walletAddress}</span></h2>
        <h2>Prayers Read: <span>{prayersRead}</span></h2>
        <h2>Total Zikirs: <span>{zikirs}</span></h2>
      </div>
      <div className="profile-library">
        <h2>Library</h2>
        <ul>
          {library.map((book, index) => (
            <li key={index}>{book.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
