import React, { useState } from 'react';
import { DateBox } from './components/DateBox';
import { Header } from './components/Header';


/* This was externally downloaded using fontawesome. I found a great video explaining how to on youtube.com   . https://www.youtube.com/watch?v=7fdpzXeXbcE*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun, faCloudSunRain, faWind, faFaceGrinBeamSweat  } from '@fortawesome/free-solid-svg-icons'
import './App.css';

/* This is the API for getting up to date weather info. Openweather is a great easy to use API. Lots of tutorials seemed to use it.*/
const api = {
  key: "36ffa85294264ac7d94239e6938bd968",
  base: "https://api.openweathermap.org/data/2.5/"
}

/* This creates the search bar.*/
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 25) ? 'app warm' : 'app') : 'app'}>
      <main>
        <Header />
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter city name"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <DateBox />
          <div className="weather-box">
            <div className="temp">
            <FontAwesomeIcon id="faCloudSun" icon={faCloudSun} />
            <div className="location">{weather.name}, {weather.sys.country}</div>
              {Math.round(weather.main.temp)}°c
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        </div>
        ) : ('')}
        {(typeof weather.main != "undefined") ? (
        <div className="bottom">
            <div className="feels">
            <p>{Math.round(weather.main.feels_like)}°C</p>
            <FontAwesomeIcon icon={faCloudSunRain} />
              <p>Feels Like</p>
              
            </div>
            <div className="humidity">
            <p>{weather.main.humidity}%</p>
            <FontAwesomeIcon icon={faFaceGrinBeamSweat} />
              <p>Humidity</p>
              
            </div>
            <div className="wind">
            <p>{Math.round(weather.wind.speed)}KM/H</p>
            <FontAwesomeIcon icon={faWind} />
              <p>Wind Speed</p>
              
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
    
  );
}


export default App;
