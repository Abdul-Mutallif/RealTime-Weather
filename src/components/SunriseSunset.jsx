const parseTimeToMinutes = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const modifier = match[3] ? match[3].toUpperCase() : null;

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
};

export default function SunriseSunset({ sunrise, sunset }) {
  if (!sunrise || !sunset) {
    return null;
  }

  const sunriseMinutes = parseTimeToMinutes(sunrise);
  const sunsetMinutes = parseTimeToMinutes(sunset);

  if (sunriseMinutes === null || sunsetMinutes === null) {
    return null;
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const totalDaylightMinutes = sunsetMinutes - sunriseMinutes;
  const minutesSinceSunrise = currentMinutes - sunriseMinutes;

  const rawProgress = totalDaylightMinutes > 0
    ? (minutesSinceSunrise / totalDaylightMinutes) * 100
    : 0;

  const progress = Math.min(Math.max(rawProgress, 0), 100);

  return (
    <div className="sunrise-sunset">
      <div className="sun-times">
        <div className="sun-time">
          <i className="fas fa-sun"></i>
          <div>
            <div className="sun-label">Sunrise</div>
            <div className="sun-value">{sunrise}</div>
          </div>
        </div>
        <div className="sun-time">
          <i className="fas fa-moon"></i>
          <div>
            <div className="sun-label">Sunset</div>
            <div className="sun-value">{sunset}</div>
          </div>
        </div>
      </div>
      <div className="sun-progress-track">
        <div className="sun-progress-fill" style={{ width: `${progress}%` }}></div>
        <div className="sun-indicator" style={{ left: `${progress}%` }}>
          <i className="fas fa-circle"></i>
        </div>
      </div>
    </div>
  );
}
