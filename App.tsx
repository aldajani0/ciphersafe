import React, { useState, useCallback } from 'react';
import { encryptData, decryptData } from './services/cryptoService';
import { EncryptedData } from './types';
import CipherPanel from './components/CipherPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';

const App: React.FC = () => {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [encryptedText, setEncryptedText] = useState<string>('');
  const [decryptedText, setDecryptedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };
  
  const onEncryptSuccess = (outputString: string) => {
    setEncryptedText(outputString);
    setMode('decrypt');
  };

  const handleEncrypt = useCallback(async (plainText: string, password: string) => {
    if (!plainText || !password) {
      setError('Plain text and password are required.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setDecryptedText('');
    try {
      const encrypted: EncryptedData = await encryptData(plainText, password);
      const outputString = btoa(JSON.stringify(encrypted));
      onEncryptSuccess(outputString);
    } catch (err) {
      setError('Encryption failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDecrypt = useCallback(async (cipherText: string, password: string) => {
    if (!cipherText || !password) {
      setError('Encrypted text and password are required.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const encryptedData: EncryptedData = JSON.parse(atob(cipherText));
      const decrypted = await decryptData(encryptedData, password);
      setDecryptedText(decrypted);
    } catch (err) {
      setDecryptedText('');
      setError('Decryption failed. Check your encrypted text or password.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
  }, []);

  const handleModeChange = (newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    setError(null);
    setDecryptedText('');
    if (newMode === 'encrypt') {
      setEncryptedText('');
    }
  };


  return (
    <div className="min-h-screen flex flex-col font-sans overflow-hidden">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8 md:py-12">
        <CipherPanel
          mode={mode}
          onModeChange={handleModeChange}
          onEncrypt={handleEncrypt}
          onDecrypt={handleDecrypt}
          onCopy={handleCopy}
          isLoading={isLoading}
          error={error}
          setError={setError}
          encryptedText={encryptedText}
          decryptedText={decryptedText}
          setEncryptedText={setEncryptedText}
        />
      </main>
      <Footer />
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
};

export default App;