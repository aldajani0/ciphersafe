import React from 'react';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-panel backdrop-blur-md text-text-primary font-bold py-3 px-6 rounded-2xl shadow-2xl shadow-glow-end/20 border border-text-primary/10 animate-slide-in-up">
      {message}
    </div>
  );
};

export default Toast;