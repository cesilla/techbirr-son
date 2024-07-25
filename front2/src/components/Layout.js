import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <Navbar />
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
