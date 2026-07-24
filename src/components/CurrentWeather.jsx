import { getWeatherIcon, getFeelsLikeBadge } from '../utils/weatherUtils';
import AnimatedNumber from './AnimatedNumber';

export default function CurrentWeather({
  location,
  date,
  temperature,
  description,
  iconCode,
  isDay,
  tempValue,
}) {
  const iconClass = getWeatherIcon(iconCode, isDay);
  const badge = tempValue != null ? getFeelsLikeBadge(tempValue) : null;

  return (
    <div className="weather-card current-main">
      <div className="location">{location}</div>
      <div className="date">{date}</div>
      <div className="temp-container">
        <i id="weatherIcon" className={`fas ${iconClass}`}></i>
        <div className="temperature">
          {tempValue != null ? (
            <AnimatedNumber value={tempValue} suffix="°C" />
          ) : (
            temperature
          )}
        </div>
      </div>
      {badge && (
        <span className={`feels-badge ${badge.className}`}>{badge.label}</span>
      )}
      <div className="weather-desc">{description}</div>
    </div>
  );
}
