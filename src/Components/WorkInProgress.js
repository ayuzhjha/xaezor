import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const messages = [
  '🚧 Work in Progress! 🚧',
  'We are building something awesome...',
  'Hang tight, this feature is coming soon!',
  'Stay tuned for updates!'
];

const WorkInProgress = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
      color: '#fff',
      fontFamily: 'monospace',
      textAlign: 'center',
      padding: '2rem',
      zIndex: 1000,
      marginTop: '0',
      marginBottom: '0'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', animation: 'pulse 1s infinite alternate' }}>
        {messages[msgIndex]}
      </div>
      <button
        onClick={() => navigate('/apps')}
        style={{
          marginTop: '2rem',
          padding: '0.75rem 2rem',
          fontSize: '1.2rem',
          borderRadius: '8px',
          border: 'none',
          background: '#00ffe7',
          color: '#232526',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 12px rgba(0,255,231,0.2)'
        }}
      >
        Back to Apps
      </button>
      <style>{`
        @keyframes pulse {
          0% { text-shadow: 0 0 10px #00ffe7, 0 0 20px #00ffe7; }
          100% { text-shadow: 0 0 30px #00ffe7, 0 0 60px #00ffe7; }
        }
      `}</style>
    </div>
  );
};

export default WorkInProgress; 