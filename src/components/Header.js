// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header style={headerStyles}>
      <h1 style={{ color: '#fff', margin: 0 }}>World Countries Explorer App by James Montealto</h1>
    </header>
  );
};

const headerStyles = {
  backgroundColor: '#2b7a78',
  padding: '20px',
  textAlign: 'center',
};

export default Header;
