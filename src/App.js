import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSearch = async () => {
    if (!city) {
      setError('Please enter a city name!');
      return;
    }

    const newSearches = [city, ...recentSearches.slice(0, 4)]; // Sirf last 5 searches rakho
    setRecentSearches(newSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newSearches));


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
      });
      setCity('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="app">
      <h1>Weather App</h1>

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
            <p>Temperature: {weatherData.temp}°C</p>
            <p>Weather: {weatherData.description}</p>
            <p>Feels Like: {weatherData.feels_like}°C</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind Speed: {weatherData.wind_speed} m/s</p>
          </div>
        ) : (
          !loading && !error && <p>Enter a city to see the weather!</p>
        )
      }
    </div >
  );
}

export default App;