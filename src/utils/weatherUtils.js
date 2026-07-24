export function getWeatherIcon(code, isDay = true) {
  if (code === 1000) return isDay ? 'fa-sun' : 'fa-moon';
  if (code === 1003) return isDay ? 'fa-cloud-sun' : 'fa-cloud-moon';
  if (code === 1006 || code === 1009) return 'fa-cloud';
  if (code === 1030 || code === 1135 || code === 1147) return 'fa-smog';
  if (code >= 1063 && code <= 1195) return 'fa-cloud-rain';
  if (code >= 1201 && code <= 1237) return 'fa-snowflake';
  if (code >= 1240 && code <= 1264) return 'fa-cloud-showers-heavy';
  if (code >= 1273 && code <= 1282) return 'fa-bolt';
  return 'fa-cloud';
}

export function getWindDirection(degrees) {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function formatDateTime(date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const time = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  return `${day} ${month}, ${year} ${time} GMT`;
}

export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Returns a "feels like" badge based on temperature in °C.
 * Returns { label, className } for rendering.
 */
export function getFeelsLikeBadge(tempC) {
  if (tempC <= 0) return { label: 'Freezing', className: 'badge-freezing' };
  if (tempC <= 10) return { label: 'Cold', className: 'badge-cold' };
  if (tempC <= 20) return { label: 'Cool', className: 'badge-cool' };
  if (tempC <= 30) return { label: 'Warm', className: 'badge-warm' };
  return { label: 'Hot', className: 'badge-hot' };
}
