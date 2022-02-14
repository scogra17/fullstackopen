import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UnorderedList = ({ items }) => {
  return (
    <ul>
      {items.map(i => <li key={i}>{i}</li>)}
    </ul>
  )
}

const DetailedCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital}<br/>
      area {country.area}<br/>
      <h4>languages:</h4>
      <UnorderedList items={Object.values(country.languages)}/>
      <img src={country.flags.png} alt="flag"/>
    </div>
  )
}

const Country = ({ country, onClick }) => {
  console.log(onClick)
  return (
    <div>
      {country.name.common}
      <button onClick={onClick} data-country-name={country.name.common}>
        show
      </button>
    </div>
  )
}

const Countries = ({ countries, onClick }) => {
  if (countries.length === 0) {
    return (<div>No matches, specify another filter</div>)
  }
  if (countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }
  if (countries.length === 1) {
    return (<DetailedCountry country={countries[0]} />)
  }
  return (
    <>
      {countries.map(country => <Country key={country.cca3} country={country} onClick={onClick} />)}
    </>
  )
}

function App() {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleShowCountry = (event) => {
    setCountryFilter(event.target.getAttribute('data-country-name'))
  }

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesToDisplay = () => {
    return countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
  }

  return (
    <div>
      find countries <input
        onChange={handleCountryFilterChange}
        value={countryFilter}
      />
      <Countries countries={countriesToDisplay()} onClick={handleShowCountry}/>
    </div>
  )
}

export default App;
