import React from 'react';
import './Rewards.css';

const Rewards = ({ user }) => {
  if (!user) {
    return <div className="rewards">Ödüller yükleniyor...</div>;
  }

  return (
    <div className="rewards">
      <h2>{user.name}'in Ödülleri</h2>
      <p>Puan: {user.points}</p>
      <h3>Rozetler:</h3>
      <ul>
        {user.badges.map((badge, index) => (
          <li key={index}>{badge}</li>
        ))}
      </ul>
    </div>
  );
};

export default Rewards;
