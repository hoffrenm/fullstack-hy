import React from 'react'
import Country from './Country'

const CountryList = ({ countries, filter, handleShowClick }) => {
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  if (filteredCountries.length > 10) {
    return <p>Too many matches, define search</p>
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }

  return (
    <>
      <ul>
        {filteredCountries.map(country => (
          <li key={country.name}>
            {country.name}{' '}
            <button onClick={() => handleShowClick(country.name)}>Show</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default CountryList
