import { getWeatherIcon } from '../utils/weatherUtils';

export default function WeeklyForecast({ forecastData }) {
  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="forecast-section">
      <h2>Upcoming Forecast</h2>
      <div className="weekly-forecast">
        {forecastData.map((dayData, index) => {
          const date = new Date(dayData.date);
          const dayName = index === 0 ? 'Today' : dayNames[date.getDay()];
          const iconClass = getWeatherIcon(dayData.day?.condition?.code, true);

          return (
            <div key={dayData.date || index} className="day-card">
              <div className="day-name">{dayName}</div>
              <i className={`fas ${iconClass}`}></i>
              <div className="day-temp">
                {Math.round(dayData.day?.maxtemp_c || 0)}° / {Math.round(dayData.day?.mintemp_c || 0)}°
              </div>
              <div className="day-condition">{dayData.day?.condition?.text || ''}</div>
              <div className="day-details">
                <div>Clouds: {dayData.day?.avgvis_km || 0}%</div>
                <div>Wind: {dayData.day?.maxwind_kph || 0} km/h</div>
                <div>Humidity: {dayData.day?.avghumidity || 0}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
