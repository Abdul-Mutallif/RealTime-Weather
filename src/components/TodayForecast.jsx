import { getWeatherIcon } from '../utils/weatherUtils';

export default function TodayForecast({ hourlyData }) {
  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  const currentHour = new Date().getHours();
  const offsets = [3, 6, 9];

  const forecastCards = offsets
    .map((offset) => {
      const targetHour = (currentHour + offset) % 24;
      const match = hourlyData.find((h) => {
        if (!h || !h.time) return false;
        return new Date(h.time).getHours() === targetHour;
      });
      return match;
    })
    .filter(Boolean);

  if (forecastCards.length === 0) return null;

  return (
    <div className="forecast-section">
      <h2>Today&apos;s Forecast</h2>
      <div className="today-forecast">
        {forecastCards.map((data, idx) => {
          const time = data.time.split(' ')[1] || '00:00';
          const temp = `${Math.round(data.temp_c)}°C`;
          const iconClass = getWeatherIcon(data.condition?.code, Boolean(data.is_day));

          return (
            <div key={idx} className="forecast-card">
              <div className="forecast-time">{time}</div>
              <i className={`fas ${iconClass}`}></i>
              <div className="forecast-temp">{temp}</div>
              <div className="forecast-desc">{data.condition?.text || ''}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
