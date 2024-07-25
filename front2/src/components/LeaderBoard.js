import React from 'react';
import './LeaderBoard.css';

const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboard">
      <h2>Liderlik Tablosu</h2>
      <ul>
        {users.sort((a, b) => b.points - a.points).map((user, index) => (
          <li key={index}>
            {user.name} - {user.points} Puan
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
