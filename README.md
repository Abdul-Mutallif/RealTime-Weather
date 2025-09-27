# Weather Forecasting App 🌤️

A modern, responsive weather forecasting application with smart predictions and beautiful animations.

![Weather](https://img.shields.io/badge/Weather-Forecasting-blue)
![Responsive](https://img.shields.io/badge/Responsive-Yes-green)
![Dark Mode](https://img.shields.io/badge/Dark%2520Mode-Yes-purple)

---

## 🌟 Live Demo

👉 [View Live Application](https://abdul-mutallif.github.io/RealTime-Weather/)

---

## ✨ Features

### 🌦️ Core Functionality

* Real-time Weather Data – Current conditions for any city worldwide
* Upcoming Forecast – Detailed weekly predictions
* Today's Forecast – 3-hour interval updates
* Air Conditions – Real feel, humidity, wind speed, and cloud coverage

### 🎨 User Experience

* Dark/Light Mode – Smooth theme switching with animations
* Smart Predictions – AI-powered advice and recommendations will be added later
* Cloud Animations – Minimal cloud background for immersive feel
* Responsive Design – Works on desktop, tablet, and mobile
* AOS Animations – Smooth scroll-triggered effects

### 🔮 Smart Predictions will be added later

The app provides intelligent weather advice including:

* ☂️ Umbrella alerts (rain probability)
* 👕 Clothing recommendations (temperature)
* ☀️ UV protection tips
* 💨 Wind condition warnings
* 🚗 Travel advice for foggy/stormy conditions

---

## 🛠️ Technology Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Icons:** Font Awesome 6.4.0
* **Fonts:** Poppins (Google Fonts)
* **Animations:** AOS (Animate On Scroll)
* **API:** [WeatherAPI.com](https://www.weatherapi.com/)
* **Deployment:** GitHub Pages

---

## 📱 Usage Guide

### Searching for Weather

1. Enter a city name (e.g., *kanpur*, *New York*, *Tokyo*)
2. Press **Enter** or click **Search**
3. View detailed weather data

### Understanding the Interface

* **Header:** Date, time, theme toggle
* **Weather Summary:** Overview with smart advice
* **Current Weather:** Temperature, description, icons
* **Air Conditions:** Humidity, wind, clouds, real feel
* **Today's Forecast:** 3-hour intervals
* **7-Day Forecast:** Weekly overview

### Smart Predictions Examples ( will be added later)

* > 70% rain → *"Take your umbrella! 🌧️"*
* > 30°C → *"Stay hydrated! 🔥"*
* > High UV → *"Sunscreen recommended! ☀️"*
* > Strong winds → *"Secure loose items! 💨"*

---

## 🎯 Key Components

**HTML Structure**

* Header, Search bar, Weather summary, Current Weather
* Air Conditions, Today's Forecast, 7-Day Forecast

**CSS Features**

* CSS Variables for theming
* Responsive grid layouts
* Cloud animation background
* Smooth transitions

**JavaScript Modules**

* Weather API integration
* Theme management
* Prediction algorithm
* Error handling

---

## 🌐 API Integration

The app uses **WeatherAPI.com** to fetch:

* Current conditions
* 7-Day forecast
* Hourly updates
* Air quality & atmospheric metrics

**Endpoint:**

```
https://api.weatherapi.com/v1/forecast.json
```

---

## 📊 Features Breakdown

### Current Weather

* Location, country
* Temperature (large display)
* Condition description & icon
* Real-feel

### Air Conditions

* Humidity
* Wind speed/direction
* Cloud coverage
* Real feel

### Forecasts

* **Today's Forecast:** 3-hour intervals
* **7-Day Forecast:** High/low temps, rain %, wind

---

## 🎨 Customization

**Theme Colors (style.css):**

```css
:root {
    --dark-bg: #0a0a12;
    --accent: #6c5ce7;
    --text: #e6e6fa;
}
```

**Adding New Predictions (script.js):**

```javascript
if (condition.includes('snow')) {
    predictions.push("❄️ Winter gear needed - Snow expected today");
}
```

---

## 📱 Responsive Design

* **Desktop (1200px+):** Full grid layout
* **Tablet (768px-1199px):** Adjusted layout
* **Mobile (<768px):** Single column

---

## 🔧 Development

**File Structure**

```
RealTime-Weather/
├── index.html
├── style.css
├── script.js
└── README.md
```

**Browser Support:** Chrome, Firefox, Safari, Edge

---

## 🐛 Troubleshooting

* **City not found:** Check spelling
* **No data:** Check internet/API status
* **Theme not saving:** Clear cache

**Error Messages:**

* "City not found" → invalid city
* "Network error" → connectivity issue
* "API error" → WeatherAPI issue

---

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit changes
4. Push branch
5. Open Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

* [WeatherAPI.com](https://www.weatherapi.com/) – Reliable data
* [Font Awesome](https://fontawesome.com/) – Icons
* [Google Fonts](https://fonts.google.com/specimen/Poppins) – Typography
* [AOS Library](https://michalsnik.github.io/aos/) – Animations

---

## 🌟 Star History

If you find this project useful, please give it a **⭐**

---

**Built with ❤️ by Abdul Mutallif**

![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)
![Live Demo](https://img.shields.io/badge/Live-Demo-green)
