import React from 'react';

const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <ShieldCheckIcon className="w-8 h-8 text-glow-start" />
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            <span className="text-glow-start">Cipher</span><span className="text-glow-end">Safe</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;