import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const apiKey = '00671167f1daed063e36b4fb12755b70';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

    const fetchWeather = async (query) => {
    try {
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`);
      setWeather(response.data);
        } catch (error) {
      console.error('Hava durumu alınırken bir hata oluştu:', error);
        setWeather(null);
    }
      };

  const handleSearchSubmit = (event) => {
       event.preventDefault();
    if (searchQuery) {
        fetchWeather(searchQuery);
    }
      };

  const clearWeather = () => {
     setWeather(null);
    setSearchQuery('');
  };

      return (
     <div className="App">
       <header>
          <h1>Hava Durumu Uygulaması</h1>
           <form onSubmit={handleSearchSubmit}>
          <input
                 type="text"
            value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="Şehir arayın..."
            ref={searchInputRef}
          />
          <button type="submit">Ara</button>
        </form>
      </header>
             <div className="weather-container">
        {weather ? (
          <div className="weather-details">
               <h2>{weather.name}</h2>
             <p>Sıcaklık: {weather.main.temp}°C</p>
          <p>Hissedilen Sıcaklık: {weather.main.feels_like}°C</p>
          <p>Hava: {weather.weather[0].description}</p>
          <p>Nem: {weather.main.humidity}%</p>
          <p>Rüzgar Hızı: {weather.wind.speed} m/s</p>
          <p>Rüzgar Yönü: {weather.wind.deg}°</p>
            <button className='buton' onClick={clearWeather}>Kapat</button>
          </div>
           ) : (
          <div className="countries-weather">
            <h2 className="h2">Popüler Hava Durumu</h2>
               <WeatherCards />
          </div>
        )}
      </div>
    </div>
  );
    };

    const WeatherCards = () => {
      const countries = [
        { country: "Turkey", capital: "Ankara" },
        { country: "France", capital: "Paris" },
        { country: "Germany", capital: "Berlin" },
        { country: "Italy", capital: "Rome" },
        { country: "Spain", capital: "Madrid" },
        { country: "UK", capital: "London" },
        { country: "Russia", capital: "Moscow" },
        { country: "China", capital: "Beijing" },
        { country: "Japan", capital: "Tokyo" },
        { country: "Brazil", capital: "Brasília" }
      ];
    
      return (
        <div className="weather-cards">
          <div className="upper-cards">
            {countries.slice(0, 5).map((country, index) => (
              <WeatherCard key={index} country={country} />
            ))}
          </div>
          <div className="lower-cards">
            {countries.slice(5, 10).map((country, index) => (
              <WeatherCard key={index + 5} country={country} />
            ))}
          </div>
        </div>
      );
    };
const WeatherCard = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

       useEffect(() => {
      const fetchWeather = async () => {
        try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`
            );
        setWeatherData(response.data);
      } catch (error) {
            console.error(`Hava durumu alınırken bir hata oluştu (${country.capital}):`, error);
        setWeatherData(null);
      }
       };

       fetchWeather();
  }, [country.capital]);

  return (
    <div className="weather-card">
      <h3>{country.capital}, {country.country}</h3>
      {weatherData ? (
        <div>
          <p>Sıcaklık: {weatherData.main.temp}°C</p>
          <p>Hissedilen Sıcaklık: {weatherData.main.feels_like}°C</p>
          <p>Hava: {weatherData.weather[0].description}</p>
          <p>Nem: {weatherData.main.humidity}%</p>
          <p>Rüzgar Hızı: {weatherData.wind.speed} m/s</p>
            <p>Rüzgar Yönü: {weatherData.wind.deg}°</p>
        </div>
      ) : (
            <p className="error-message">Hava durumu bilgisi bulunamadı.</p>
         )}
    </div>
  );
};

export default App;