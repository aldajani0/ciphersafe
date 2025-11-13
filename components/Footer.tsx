import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-transparent py-6">
      <div className="container mx-auto px-4 text-center text-text-secondary text-sm">
        <p>&copy; {currentYear} CipherSafe bu AMIRAH.</p>
        <p className="mt-1 opacity-70">Your data is encrypted in your browser and never sent to any server.</p>
      </div>
    </footer>
  );
};

export default Footer;