import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );
  const [darkMode, setDarkMode] = useState(false); // Add dark mode state

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSearch = async () => {
    if (!city) {
      setError('Please enter a city name!');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found or something went wrong!');
      }
      const data = await response.json();
      setWeatherData({
        city: data.name,
        temp: data.main.temp,
        feels_like: data.main.feels_like, // Feels like temperature
        humidity: data.main.humidity, // Humidity
        wind_speed: data.wind.speed, // Wind Speed
        description: data.weather[0].main,
        icon: data.weather[0].icon,
        country: data.sys.country
      });
      setCity('');

      const updatedSearches = recentSearches.filter(item => item.toLowerCase() !== city.toLowerCase()); // Remove if already exists
      const newSearches = [city, ...updatedSearches.slice(0, 4)]; // Add city at first & keep only last 5 searches
      setRecentSearches(newSearches);
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? (
          <img src="https://img.icons8.com/?size=100&id=19209&format=png&color=000000" alt="Light Mode" className="dark-mode-icon" />
        ) : (
          <img src="https://img.icons8.com/?size=100&id=20182&format=png&color=000000" alt="Dark Mode" className="dark-mode-icon" />
        )}
      </div>

      <h1>
        <img src="https://logodix.com/logo/1255108.jpg" alt="weather icon" style={{ width: "55px", verticalAlign: "middle", marginRight: "10px", marginTop: "-8px", borderRadius: "7px" }} />
        Weather App
      </h1>


      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h3>Recent Searches:</h3>
          <div className="recent-searches-list">
            {recentSearches.map((item, index) => (
              <button key={index} onClick={() => setCity(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && !loading && <p className="error">{error}</p>}

      {/* Weather Card */}
      {
        !loading && !error && weatherData ? (
          <div className="weather-card">
            <h2>{weatherData.city}</h2>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="weather icon"
              className="weather-icon"
            />
            <div className="data-container">
              <div className="data-item">
                <p>
                  <span className="data-label">Temperature:</span> <strong>{weatherData.temp}°C</strong>
                </p>
              </div>
              <div className="data-item">
                <p>
                  <span className="data-label">Feels Like:</span> <strong>{weatherData.feels_like}°C</strong>
                </p>
              </div>
              <div className="data-item">
                <p>
                  <span className="data-label">Weather:</span> <strong>{weatherData.description}</strong>
                </p>
              </div>
              <div className="data-item">
                <p>
                  <span className="data-label">Humidity:</span> <strong>{weatherData.humidity}%</strong>
                </p>
              </div>
              <div className="data-item">
                <p>
                  <span className="data-label">Wind Speed:</span> <strong>{weatherData.wind_speed} m/s</strong>
                </p>
              </div>
              <div className="data-item">
                <p>
                  <span className="data-label">Country:</span> <strong>{weatherData.country}</strong>
                </p>
              </div>
            </div>
          </div>
        ) : (
          !loading && !error && <p>Enter a city to see the weather!</p>
        )
      }

    </div >
  );
}

export default App;