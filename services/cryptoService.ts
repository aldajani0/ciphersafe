
import { EncryptedData } from '../types';

const ITERATIONS = 100000;
const KEY_LENGTH = 256;
const ALGORITHM = 'AES-GCM';

// Utility to convert ArrayBuffer to Base64 string
const bufferToBase64 = (buffer: ArrayBuffer): string => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

// Utility to convert Base64 string to ArrayBuffer
const base64ToBuffer = (base64: string): ArrayBuffer => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// Derives a key from a password and salt using PBKDF2
const getKey = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  
  const baseKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    baseKey,
    { name: ALGORITHM, length: KEY_LENGTH },
    true,
    ['encrypt', 'decrypt']
  );
};

// Encrypts plaintext data with a password
export const encryptData = async (plainText: string, password: string): Promise<EncryptedData> => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const dataToEncrypt = encoder.encode(plainText);

  const key = await getKey(password, salt);

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv: iv,
    },
    key,
    dataToEncrypt
  );

  return {
    salt: bufferToBase64(salt),
    iv: bufferToBase64(iv),
    cipherText: bufferToBase64(encryptedBuffer),
  };
};

// Decrypts ciphertext with a password
export const decryptData = async (encryptedData: EncryptedData, password: string): Promise<string> => {
  const salt = base64ToBuffer(encryptedData.salt);
  const iv = base64ToBuffer(encryptedData.iv);
  const cipherText = base64ToBuffer(encryptedData.cipherText);

  const key = await getKey(password, new Uint8Array(salt));

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: ALGORITHM,
      iv: new Uint8Array(iv),
    },
    key,
    cipherText
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
};
