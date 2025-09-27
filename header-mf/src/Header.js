import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#282c34',
    padding: '1rem',
    color: 'white',
    textAlign: 'center',
    marginBottom: '1rem'
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1rem'
  };

  const linkStyle = {
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '1.1rem'
  };

  return (
    <header style={headerStyle}>
      <h1>🚀 Microfrontends Demo</h1>
      <nav style={navStyle}>
        <a href="#" style={linkStyle}>Home</a>
        <a href="#" style={linkStyle}>Products</a>
        <a href="#" style={linkStyle}>About</a>
        <a href="#" style={linkStyle}>Contact</a>
      </nav>
    </header>
  );
};

export default Header;