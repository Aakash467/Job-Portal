import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '1rem 0',
      backgroundColor: '#f1f1f1',
      color: '#333',
      fontSize: '0.85rem',
      borderTop: '1px solid #ddd',
      marginTop: 'auto'
    }}>
      © {new Date().getFullYear()} Applyly. All rights reserved.
    </footer>
  );
};

export default Footer;