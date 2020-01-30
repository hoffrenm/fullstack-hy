import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const Weather = ({ capital }) => {
  const [weatherInfo, setWeatherInfo] = useState(null)

  const API_KEY = `${process.env.REACT_APP_API_KEY}`

  useEffect(() => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=${API_KEY}`
    ).then(response => setWeatherInfo(response.data))
  }, [])

  if (!weatherInfo) {
      return <p>Weather information not available</p>
  }
  
  return (
    <div>
      <h2>Weather in {weatherInfo.name}</h2>
      <p>
        <b>Temperature: </b>{weatherInfo.main.temp} Celsius{' '}
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
        alt="icon of weather condition"
      />
      <p><b>Wind: </b>{weatherInfo.wind.speed} m/s, direction {weatherInfo.wind.deg} degrees</p>
    </div>
  )
}

export default Weather
