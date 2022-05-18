import logo from './weather.png';
import './index.css';
import React, { useState } from "react";
import axios from 'axios';

function App() {
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState("")
  const [description, setDescription] = useState("")
  const [temperature, setTemperature] = useState("")

  const fetchWeatherData = () => {
    axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=Z8456W7Y3XR5VFTG2H2CMP6T6&contentType=json`)
      .then(res => {
        const data = res.data;
        setLocation(data.address)
        setWeather(data.currentConditions.conditions)
        setDescription(data.days[0].description)
        setTemperature(data.days[0].temp)
      })
  }
  return (
    <>
      <div className='centered-container'>
        <img src={logo} height="100" alt='weatherimage' />
        <div className='title'>Weatherly</div>
        <div className='heading1'>Enter location to view weather</div>
        <div>
          <input className='input-box' type='text' value={location} onChange={(e) => { setLocation(e.target.value) }} placeholder='Enter location' />
        </div>
        <div className='heading2'>{(location === "") ? "Location is required" : `${location} weather is ${weather}`}</div>
        <div>Temperature in  {location} is: {(temperature !== "") && `${temperature}`}°C</div>
        <div className='more-info'><u>More Info</u></div>
        <div>{(description !== "") && `${description}`}</div>
        <button className='btn' onClick={fetchWeatherData}>Search</button>
      </div>
    </>
  );
}

export default App;
