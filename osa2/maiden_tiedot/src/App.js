import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import CountryList from './components/CountryList'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    Axios.get('https://restcountries.eu/rest/v2/all').then(response =>
      setCountries(response.data)
    )
  }, [])

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const handleShowClick = country => {
    setFilter(country)
  }

  return (
    <div>
      <Filter value={filter} handleChange={handleFilterChange} />
      <CountryList
        countries={countries}
        filter={filter}
        handleShowClick={handleShowClick}
      />
    </div>
  )
}

export default App
