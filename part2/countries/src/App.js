import React, { useState, useEffect } from 'react'
import axios from 'axios'
import weatherIcons from './weather_icons.json'

const api_key = process.env.REACT_APP_API_KEY

const UnorderedList = ({ items }) => {
  return (
    <ul>
      {items.map(i => <li key={i}>{i}</li>)}
    </ul>
  )
}

const WeatherReport = ({ cityName, cityWeather }) => {
  if (cityWeather.main) {
    return (
      <div>
        <h2>Weather in {cityName}</h2>
        <div>temperature { cityWeather.main.temp} Celcius</div>
        <img src={cityWeather.weatherIcon} alt={cityWeather.weather[0].description}/>
        <div>wind {cityWeather.wind.speed} m/s</div>
    </div>
    )
  }
  return (
    <div>
      <h2>Weather in {cityName}</h2>
      <div>No weather data available</div>
    </div>
  )
}

const DetailedCountry = ({ country, cityWeather }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital}<br/>
      area {country.area}<br/>
      <h4>languages:</h4>
      <UnorderedList items={Object.values(country.languages)}/>
      <img src={country.flags.png} alt="flag"/>
      <WeatherReport cityName={country.capital} cityWeather={cityWeather} />
    </div>
  )
}

const Country = ({ country, onClick }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={onClick} data-country-name={country.name.common}>
        show
      </button>
    </div>
  )
}

const Countries = ({ countries, onClick, cityWeather }) => {
  if (countries.length === 0) {
    return (<div>No matches, specify another filter</div>)
  }
  if (countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }
  if (countries.length === 1) {
    return (<DetailedCountry country={countries[0]} cityWeather={cityWeather} />)
  }
  return (
    <>
      {countries.map(country => <Country key={country.cca3} country={country} onClick={onClick} />)}
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const [cityName, setCityName] = useState('')
  const [cityWeather, setCityWeather] = useState({})

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const cityWeatherHook = () => {
    if (cityName != '') {
      axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`)
      .then(response => {
        response.data.weatherIcon = weatherIcons.icons[response.data.weather[0].description]
        setCityWeather(response.data)
      })
    }
  }

  useEffect(cityWeatherHook, [cityName])

  const handleShowCountry = (event) => {
    setCountryFilter(event.target.getAttribute('data-country-name'))
  }

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesToDisplay = () => {
    let countriesToDisplay = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
    if (countriesToDisplay.length === 1) {
      if (countriesToDisplay[0].capital != cityName) {
        setCityName(countriesToDisplay[0].capital)
      }
    }
    return countriesToDisplay
  }

  return (
    <div>
      find countries <input
        onChange={handleCountryFilterChange}
        value={countryFilter}
      />
      <Countries countries={countriesToDisplay()} onClick={handleShowCountry} cityWeather={cityWeather}/>
    </div>
  )
}

export default App;
