const API_KEY = '1c5905e60f674b3bbc054237252202';
let currentTheme = localStorage.getItem('theme') || 'light';

const weatherConditions = {
  1000: 'sunny',    // Sunny
  1003: 'cloudy',   // Partly cloudy
  1006: 'cloudy',   // Cloudy
  1009: 'cloudy',   // Overcast
  1030: 'cloudy',   // Mist
  1063: 'rainy',    // Patchy rain
  1066: 'snow',     // Patchy snow
  1069: 'snow',     // Patchy sleet
  1072: 'rainy',    // Patchy freezing drizzle
  1087: 'rainy',    // Thundery outbreaks
  1114: 'snow',     // Blowing snow
  1117: 'snow',     // Blizzard
  1135: 'cloudy',   // Fog
  1147: 'cloudy',   // Freezing fog
  1150: 'rainy',    // Patchy light drizzle
  1153: 'rainy',    // Light drizzle
  1168: 'rainy',    // Freezing drizzle
  1171: 'rainy',    // Heavy freezing drizzle
  1180: 'rainy',    // Patchy light rain
  1183: 'rainy',    // Light rain
  1186: 'rainy',    // Moderate rain
  1189: 'rainy',    // Heavy rain
  1192: 'rainy',    // Light freezing rain
  1195: 'rainy',    // Heavy freezing rain
  1198: 'rainy',    // Light snow
  1201: 'snow',     // Moderate snow
  1204: 'snow',     // Light sleet
  1207: 'snow',     // Moderate/heavy sleet
  1210: 'snow',     // Patchy light snow
  1213: 'snow',     // Light snow
  1216: 'snow',     // Patchy moderate snow
  1219: 'snow',     // Moderate snow
  1222: 'snow',     // Patchy heavy snow
  1225: 'snow',     // Heavy snow
  1237: 'snow',     // Ice pellets
  1240: 'rainy',    // Light rain shower
  1243: 'rainy',    // Moderate/heavy rain shower
  1246: 'rainy',    // Torrential rain shower
  1249: 'snow',     // Light sleet showers
  1252: 'snow',     // Moderate/heavy sleet showers
  1255: 'snow',     // Light snow showers
  1258: 'snow',     // Moderate/heavy snow showers
  1261: 'snow',     // Light showers of ice pellets
  1264: 'snow',     // Moderate/heavy showers of ice pellets
  1273: 'rainy',    // Patchy light rain with thunder
  1276: 'rainy',    // Moderate/heavy rain with thunder
  1279: 'snow',     // Patchy light snow with thunder
  1282: 'snow'      // Moderate/heavy snow with thunder
};

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return;

  const loading = document.getElementById('loading');
  const weatherCard = document.getElementById('weatherCard');
  const errorMessage = document.getElementById('errorMessage');

  loading.style.display = 'block';
  weatherCard.style.opacity = '0';
  weatherCard.style.transform = 'translateY(20px)';
  errorMessage.style.display = 'none';

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      showError(data.error.message);
      return;
    }

    // Update weather display
    animateValue('temperature', 0, data.current.temp_c, 1000);
    animateValue('feelsLike', 0, data.current.feelslike_c, 800);

    document.getElementById('cityName').textContent =
      `${data.location.name}, ${data.location.country}`;
    document.getElementById('weatherDescription').textContent =
      data.current.condition.text;
    document.getElementById('humidity').textContent =
      `${data.current.humidity}%`;
    document.getElementById('windSpeed').textContent =
      `${data.current.wind_kph} km/h`;
    document.getElementById('airQuality').textContent =
      data.current.air_quality['us-epa-index'];

    // Update background
    const conditionCode = data.current.condition.code;
    const isDay = data.current.is_day === 1;
    const weatherType = weatherConditions[conditionCode] || 'cloudy';
    const backgroundClass = isDay ? weatherType : 'night';

    document.getElementById('backgroundAnimation').className =
      `background-animation ${backgroundClass}`;

    // Removed weather particle functionality:
    // createWeatherParticles(weatherType, isDay);

    weatherCard.style.display = 'block';
    setTimeout(() => {
      weatherCard.style.opacity = '1';
      weatherCard.style.transform = 'translateY(0)';
    }, 300);

  } catch (error) {
    console.error('Error:', error);
    showError(
      error.message.includes('Failed to fetch')
        ? 'Network error - check internet connection'
        : 'City not found or API error'
    );
  } finally {
    loading.style.display = 'none';
  }
}

function animateValue(elementId, start, end, duration) {
  const element = document.getElementById(elementId);
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

function showError(message) {
  const errorElement = document.getElementById('errorMessage');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  shakeElement(document.querySelector('.search-container'));
}

function shakeElement(element) {
  element.style.animation = 'shake 0.4s ease-in-out';
  setTimeout(() => {
    element.style.animation = '';
  }, 400);
}

// Empty function since weather particles are removed.
function createWeatherParticles(weatherType, isDay) {
  // Weather particles functionality removed.
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);

  const toggleBtn = document.querySelector('.theme-toggle');
  toggleBtn.style.transform = `rotate(${currentTheme === 'dark' ? 180 : 360}deg)`;
}

// Initialize theme
document.body.setAttribute('data-theme', currentTheme);
document.querySelector('.theme-toggle').style.transform =
  `rotate(${currentTheme === 'dark' ? 180 : 0}deg)`;

// Handle Enter key
document.getElementById('cityInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') getWeather();
});
