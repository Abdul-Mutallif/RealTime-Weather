import React from 'react';

export default function WeatherSummary({ summary }) {
  return (
    <div className="weather-summary">
      <i className="fas fa-cloud-sun"></i>
      <span className="summary-text">
        {summary || 'Loading weather summary...'}
      </span>
    </div>
  );
}
