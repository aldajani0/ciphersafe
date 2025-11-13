import React from 'react';

interface ToggleSwitchProps {
  mode: 'encrypt' | 'decrypt';
  onChange: (mode: 'encrypt' | 'decrypt') => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ mode, onChange }) => {
  return (
    <div className="relative bg-olive-dark/30 p-1 rounded-full flex items-center w-full max-w-xs mx-auto">
      <span
        className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-gradient-to-r from-glow-start to-glow-end rounded-full transition-transform duration-300 ease-in-out shadow-lg shadow-glow-end/30"
        style={{ transform: mode === 'encrypt' ? 'translateX(0.25rem)' : 'translateX(calc(100% + 0.25rem))' }}
      ></span>
      <button
        type="button"
        onClick={() => onChange('encrypt')}
        className={`relative w-1/2 py-2 text-center text-sm font-semibold rounded-full transition-colors duration-300 z-10 ${mode === 'encrypt' ? 'text-white' : 'text-text-secondary hover:text-text-primary'}`}
      >
        Encrypt
      </button>
      <button
        type="button"
        onClick={() => onChange('decrypt')}
        className={`relative w-1/2 py-2 text-center text-sm font-semibold rounded-full transition-colors duration-300 z-10 ${mode === 'decrypt' ? 'text-white' : 'text-text-secondary hover:text-text-primary'}`}
      >
        Decrypt
      </button>
    </div>
  );
};

export default ToggleSwitch;