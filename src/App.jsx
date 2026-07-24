import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherSummary from './components/WeatherSummary';
import CurrentWeather from './components/CurrentWeather';
import AirConditions from './components/AirConditions';
import SunriseSunset from './components/SunriseSunset';
import TodayForecast from './components/TodayForecast';
import WeeklyForecast from './components/WeeklyForecast';
import SkeletonLoader from './components/SkeletonLoader';
import ErrorState from './components/ErrorState';
import Footer from './components/Footer';
import { formatDate } from './utils/weatherUtils';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const searchRef = useRef(null);

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Ctrl+K keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchWeather = useCallback(async (query) => {
    if (!query || (typeof query === 'string' && !query.trim())) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=7&aqi=yes`
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        setWeatherData(null);
        throw new Error(data?.error?.message || 'No matching location found.');
      }

      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setWeatherData(null);
      setError(err.message || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-dismiss error after 8 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Geolocation on mount — fall back to 'Kanpur' if denied/unavailable
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        () => {
          fetchWeather('Kanpur');
        },
        { timeout: 5000 }
      );
    } else {
      fetchWeather('Kanpur');
    }
  }, [fetchWeather]);

  const current = weatherData?.current;
  const location = weatherData?.location;
  const forecast = weatherData?.forecast;
  const astro = forecast?.forecastday?.[0]?.astro;

  const summary = current && location
    ? `Today in ${location.name}: ${current.condition.text} with a temperature of ${Math.round(current.temp_c)}°C. Wind: ${current.wind_kph} km/h, Humidity: ${current.humidity}%.`
    : '';

  const showData = !loading && weatherData && !error;
  const showError = !loading && error && !weatherData;
  const showSkeleton = loading && !weatherData;

  return (
    <div className="container">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <SearchBar
        onSearch={fetchWeather}
        loading={loading}
        inputRef={searchRef}
      />

      {showSkeleton && <SkeletonLoader />}

      {showError && <ErrorState message={error} />}

      {showData && (
        <>
          <WeatherSummary summary={summary} />

          <div className="current-weather">
            <CurrentWeather
              location={location ? `${location.name}, ${location.country}` : 'Loading...'}
              date={formatDate(new Date())}
              temperature={current ? `${Math.round(current.temp_c)}°C` : '--°C'}
              tempValue={current ? Math.round(current.temp_c) : null}
              description={current?.condition?.text || 'Loading...'}
              iconCode={current?.condition?.code || 1003}
              isDay={current?.is_day === 1}
            />

            <AirConditions
              realFeel={current ? `${Math.round(current.feelslike_c)}°C` : '--°C'}
              realFeelValue={current ? Math.round(current.feelslike_c) : null}
              windSpeed={current ? `${current.wind_kph} km/h` : '-- km/h'}
              windValue={current ? current.wind_kph : null}
              windDegree={current?.wind_degree || 0}
              cloudCover={current ? `${current.cloud}%` : '--%'}
              cloudValue={current ? current.cloud : null}
              humidity={current ? `${current.humidity}%` : '--%'}
              humidityValue={current ? current.humidity : null}
            />
          </div>

          {astro && (
            <SunriseSunset
              sunrise={astro.sunrise}
              sunset={astro.sunset}
            />
          )}

          <TodayForecast
            hourlyData={forecast?.forecastday?.[0]?.hour || []}
          />

          <WeeklyForecast
            forecastData={forecast?.forecastday || []}
          />
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
