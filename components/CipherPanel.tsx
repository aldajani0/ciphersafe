import React, { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import UILockClosed from './icons/UILockClosed';
import UILockOpen from './icons/UILockOpen';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface CipherPanelProps {
  mode: 'encrypt' | 'decrypt';
  onModeChange: (mode: 'encrypt' | 'decrypt') => void;
  onEncrypt: (plainText: string, password: string) => void;
  onDecrypt: (cipherText: string, password: string) => void;
  onCopy: (text: string) => void;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  encryptedText: string;
  decryptedText: string;
  setEncryptedText: (text: string) => void;
}

const CipherPanel: React.FC<CipherPanelProps> = ({
  mode,
  onModeChange,
  onEncrypt,
  onDecrypt,
  onCopy,
  isLoading,
  error,
  setError,
  encryptedText,
  decryptedText,
  setEncryptedText,
}) => {
  const [plainText, setPlainText] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setPlainText('');
    setPassword('');
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === 'encrypt') {
      onEncrypt(plainText, password);
    } else {
      onDecrypt(encryptedText, password);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-panel backdrop-blur-2xl p-6 md:p-8 rounded-[3rem] border border-text-primary/10 shadow-2xl shadow-glow-end/10 animate-slide-in-up relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-aurora-start via-aurora-mid to-aurora-end bg-[length:200%_200%] animate-aurora-bg opacity-30 pointer-events-none rounded-[3rem]"></div>
      
      <div className="relative z-10">
        <ToggleSwitch mode={mode} onChange={onModeChange} />

        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          {mode === 'encrypt' ? (
            <div className="animate-fade-in">
              <label htmlFor="plainText" className="block text-sm font-medium text-text-secondary mb-2">
                Your Secret Message
              </label>
              <textarea
                id="plainText"
                rows={6}
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                className="w-full bg-transparent border-b-2 border-text-primary/20 p-2 text-text-primary focus:outline-none focus:border-glow-start transition-colors duration-300 placeholder-text-secondary/70 resize-none"
                placeholder="Enter the data you want to protect..."
                required
              />
            </div>
          ) : (
            <div className="animate-fade-in">
              <label htmlFor="cipherText" className="block text-sm font-medium text-text-secondary mb-2">
                Encrypted Data
              </label>
              <div className="relative">
                <textarea
                  id="cipherText"
                  rows={6}
                  value={encryptedText}
                  onChange={(e) => setEncryptedText(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-text-primary/20 p-2 pr-10 text-text-primary focus:outline-none focus:border-glow-end transition-colors duration-300 placeholder-text-secondary/70 resize-none"
                  placeholder="Paste your encrypted string here..."
                  required
                />
                <button
                  type="button"
                  onClick={() => onCopy(encryptedText)}
                  className="absolute bottom-2 right-2 p-2 text-text-secondary/60 hover:text-text-primary rounded-md transition-colors"
                  aria-label="Copy encrypted text"
                >
                  <ClipboardIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-text-primary/20 p-2 text-text-primary focus:outline-none focus:border-glow-start transition-colors duration-300 placeholder-text-secondary/70"
              placeholder="Create or enter your password"
              required
            />
          </div>

          {error && <p className="text-amber-400 text-sm animate-fade-in text-center">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center bg-gradient-to-r from-glow-start to-glow-end text-white font-bold py-3 px-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-glow-end/20 hover:shadow-xl hover:shadow-glow-end/30"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              mode === 'encrypt' ? 'Encrypt & Protect' : 'Decrypt Message'
            )}
          </button>
        </form>

        {mode === 'decrypt' && decryptedText && (
          <div className="mt-6 p-4 bg-black/20 rounded-2xl border border-text-primary/10 animate-fade-in">
            <h3 className="text-lg font-semibold text-glow-end flex items-center mb-2">
              <CheckCircleIcon className="w-6 h-6 mr-2" />
              Decryption Successful
            </h3>
            <p className="text-text-primary whitespace-pre-wrap break-words font-mono text-sm">{decryptedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CipherPanel;