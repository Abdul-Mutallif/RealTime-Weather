import React, { useState, useEffect } from 'react';
import { formatDateTime } from '../utils/weatherUtils';

export default function Header({ theme = 'dark', onToggleTheme }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <h1 
          onClick={() => window.location.reload()} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          title="Reload page"
        >
          <i className="fas fa-cloud-sun" style={{ color: 'var(--text-secondary)' }}></i> RealTime Weather
        </h1>
        <div className="header-controls">
          <span className="datetime">{formatDateTime(currentDateTime)}</span>
          <button 
            className="theme-toggle" 
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
