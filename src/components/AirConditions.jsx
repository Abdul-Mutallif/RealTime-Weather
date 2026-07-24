import { getWindDirection } from '../utils/weatherUtils';
import AnimatedNumber from './AnimatedNumber';
import ProgressBar from './ProgressBar';

export default function AirConditions({
  realFeel,
  windSpeed,
  windDegree = 0,
  cloudCover,
  humidity,
  windValue,
  cloudValue,
  humidityValue,
  realFeelValue,
}) {
  const windDirText = getWindDirection(windDegree || 0);

  return (
    <div className="weather-card">
      <h2>Air Conditions</h2>
      <div className="air-conditions">
        <div className="condition-item">
          <i className="fas fa-temperature-high"></i>
          <div className="condition-content">
            <div className="condition-name">Real Feel</div>
            <div className="condition-value">
              {realFeelValue != null ? (
                <AnimatedNumber value={realFeelValue} suffix="°C" />
              ) : (
                realFeel
              )}
            </div>
          </div>
        </div>

        <div className="condition-item">
          <i className="fas fa-wind"></i>
          <div className="condition-content">
            <div className="condition-name">Wind Speed</div>
            <div className="condition-value">
              {windValue != null ? (
                <AnimatedNumber value={windValue} suffix=" km/h" />
              ) : (
                windSpeed
              )}
            </div>
            {windValue != null && (
              <ProgressBar value={windValue} max={120} />
            )}
            <div className="wind-direction">
              <i
                className="fas fa-arrow-up"
                style={{ transform: `rotate(${windDegree || 0}deg)` }}
              ></i>
              <span>{windDirText}</span>
            </div>
          </div>
        </div>

        <div className="condition-item">
          <i className="fas fa-cloud"></i>
          <div className="condition-content">
            <div className="condition-name">Cloud Coverage</div>
            <div className="condition-value">
              {cloudValue != null ? (
                <AnimatedNumber value={cloudValue} suffix="%" />
              ) : (
                cloudCover
              )}
            </div>
            {cloudValue != null && (
              <ProgressBar value={cloudValue} max={100} />
            )}
          </div>
        </div>

        <div className="condition-item">
          <i className="fas fa-tint"></i>
          <div className="condition-content">
            <div className="condition-name">Humidity</div>
            <div className="condition-value">
              {humidityValue != null ? (
                <AnimatedNumber value={humidityValue} suffix="%" />
              ) : (
                humidity
              )}
            </div>
            {humidityValue != null && (
              <ProgressBar value={humidityValue} max={100} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
