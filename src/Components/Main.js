import React, { useState, useEffect } from 'react';
import { useClickSound } from '../Assets/hooks/useHoverSound';
import ParticleBackground from './ParticleBackground';

function Typewriter({ text, speed = 70, ...props }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span {...props}>{displayed}</span>;
}

const Main = () => {
  const playClickSound = useClickSound();

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <ParticleBackground />
      <section>
        <div className="hero">
          <div className="heroT">
            <h2>XAEZOR</h2>
          </div>
          <p className="heroP">
            Sword of Creation
          </p>
        </div>
      </section>

    </div>
  );
};

export default Main;