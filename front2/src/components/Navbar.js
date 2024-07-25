import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li className="kible">
            <Link to="/kibla">
              <img src="/icons/kıble.png" alt="Kible" />
            </Link>
          </li>
         
         
          <li>
            <Link to="/quran" className="quran">
              <img src="/icons/kuran.png" alt="Kuran" />
            </Link>
          </li>
          <li className="center">
            <Link to="/dhikr">
              <img src="/icons/zikir.png" alt="Zikir" className="center-icon" />
            </Link>
          </li>
          <li>
            <Link to="/names-of-allah" className="allah">
              <img src="/icons/allah.png" alt="Allah" />
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="calendar">
              <img src="/icons/takvim.png" alt="Calendar" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
