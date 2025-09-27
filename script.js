AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out',
    offset: 100
});

let currentTheme = localStorage.getItem('theme') || 'dark';

function initTheme() {
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.style.transform = 'rotate(180deg)';
        icon.style.transition = 'transform 0.4s ease';
        
        setTimeout(() => {
            icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            icon.style.transform = 'rotate(0deg)';
        }, 200);
    }
}

function updateDateTime() {
    const now = new Date();
    
    const dateTimeString = `${now.getDate()} ${now.toLocaleString('en-US', { month: 'long' })}, ${now.getFullYear()} ${now.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })} GMT`;
    
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.textContent = dateTimeString;
    }
}

function updateCurrentDate() {
    const now = new Date();
    // Format as "Friday, 26 September, 2025"
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Converting wind direction degrees to compass direction
function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

// Setting wind direction arrow with smooth rotation
function setWindDirection(degrees) {
    const arrow = document.getElementById('windDirectionIcon');
    const directionText = document.getElementById('windDirection');
    
    if (arrow && directionText) {
        arrow.style.transition = 'transform 0.5s ease';
        arrow.style.transform = `rotate(${degrees}deg)`;
        directionText.textContent = getWindDirection(degrees);
    }
}

const API_KEY = '1c5905e60f674b3bbc054237252202';

function getWeatherIcon(code, isDay = true) {
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

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        errorElement.style.display = 'block';
        
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

function hideError() {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function updateTodaysForecast(hourlyData) {
    const todayForecastElement = document.getElementById('todayForecast');
    if (!todayForecastElement) return;
    
    todayForecastElement.innerHTML = '';
    
    const now = new Date();
    const currentHour = now.getHours();
    
    const forecastHours = [3, 6, 9];
    
    forecastHours.forEach(hoursAhead => {
        const targetHour = (currentHour + hoursAhead) % 24;
        const hourData = hourlyData.find(h => {
            const hour = new Date(h.time).getHours();
            return hour === targetHour;
        });
        
        if (hourData) {
            const forecastTime = new Date(hourData.time).getHours() + ':00';
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            forecastCard.setAttribute('data-aos', 'fade-up');
            
            forecastCard.innerHTML = `
                <div class="forecast-time">${forecastTime}</div>
                <i class="fas ${getWeatherIcon(hourData.condition.code, hourData.is_day)}"></i>
                <div class="forecast-temp">${Math.round(hourData.temp_c)}°C</div>
                <div class="forecast-desc">${hourData.condition.text}</div>
            `;
            
            todayForecastElement.appendChild(forecastCard);
        }
    });
    
    AOS.refresh();
}

function updateWeeklyForecast(forecastData) {
    const weeklyForecastElement = document.getElementById('weeklyForecast');
    if (!weeklyForecastElement) return;
    
    weeklyForecastElement.innerHTML = '';
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    forecastData.forEach((dayData, index) => {
        const date = new Date(dayData.date);
        const dayName = index === 0 ? 'Today' : dayNames[date.getDay()];
        
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.setAttribute('data-aos', 'fade-up');
        dayCard.setAttribute('data-aos-delay', index * 100);
        
        dayCard.innerHTML = `
            <div class="day-name">${dayName}</div>
            <i class="fas ${getWeatherIcon(dayData.day.condition.code)}"></i>
            <div class="day-temp">${Math.round(dayData.day.maxtemp_c)}°/${Math.round(dayData.day.mintemp_c)}°</div>
            <div class="day-condition">${dayData.day.condition.text}</div>
            <div class="day-details">
                <div>Clouds: ${dayData.day.avgvis_km || 0}%</div>
                <div>Wind: ${dayData.day.maxwind_kph} km/h</div>
                <div>Humidity: ${dayData.day.avghumidity}%</div>
            </div>
        `;
        
        weeklyForecastElement.appendChild(dayCard);
    });
    
    AOS.refresh();
}

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    if (!cityInput) return;
    
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    const searchButton = document.getElementById('searchButton');
    const originalButtonText = searchButton.innerHTML;
    searchButton.innerHTML = '<i class="fas fa-spinner loading"></i> Loading...';
    searchButton.disabled = true;
    
    hideError();
    
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=7&aqi=yes`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        // Updating current weather
        document.getElementById('location').textContent = `${data.location.name}, ${data.location.country}`;
        document.getElementById('temperature').textContent = `${Math.round(data.current.temp_c)}°C`;
        document.getElementById('weatherDesc').textContent = data.current.condition.text;
        document.getElementById('realFeel').textContent = `${Math.round(data.current.feelslike_c)}°C`;
        document.getElementById('windSpeed').textContent = `${data.current.wind_kph} km/h`;
        document.getElementById('cloudCover').textContent = `${data.current.cloud}%`;
        document.getElementById('humidity').textContent = `${data.current.humidity}%`;
        
        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.className = `fas ${getWeatherIcon(data.current.condition.code, data.current.is_day)}`;
        
        setWindDirection(data.current.wind_degree);
        
        // Update in summary
        document.getElementById('summaryText').textContent = 
            `Today in ${data.location.name} : ${data.current.condition.text} with a temperature of ${Math.round(data.current.temp_c)}°C. 
            Wind: ${data.current.wind_kph} km/h, Humidity: ${data.current.humidity}%.`;
        
        updateTodaysForecast(data.forecast.forecastday[0].hour);
        updateWeeklyForecast(data.forecast.forecastday);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    } finally {
        searchButton.innerHTML = originalButtonText;
        searchButton.disabled = false;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    updateDateTime();
    updateCurrentDate();
    setInterval(updateDateTime, 1000);
    
    const themeToggle = document.getElementById('themeToggle');
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', getWeather);
    }
    
    if (cityInput) {
        cityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                getWeather();
            }
        });
    }
    
    getWeather();
});