import React, { useState, useEffect } from 'react'
import Axios from 'axios'


const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        Axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
    }, [])

    useEffect(() => {
        if (filteredCountries.length === 1) {
            Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital}&APPID=d2c63650613c7ae61a987e988f55184b`)
                .then(response => setWeather(response.data))
        } else {
            setWeather(null)
        }

    }, [filteredCountries])

    const filterCountries = e => {
        setFilter(e.target.value)
        const filtered = countries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredCountries(filtered)

    }

    return (
        <div>
            find countries: <input value={filter} onChange={filterCountries} />
            {filteredCountries.length > 1 ? (
                filteredCountries.length > 10
                    ?
                    <p>Too many matches, specify another filter</p>
                    :
                    filteredCountries.map(country => (
                        <div key={country.name}>
                            <span>{country.name} </span>
                            <span>
                                <button onClick={() => {
                                    const selectedCountry = filteredCountries.find(c => c.alpha2Code === country.alpha2Code)
                                    setFilteredCountries([selectedCountry])
                                }}>show</button>
                            </span>
                        </div>
                    ))
            )
                :
                (filteredCountries.length === 1 && (
                    <div>
                        <h1>{filteredCountries[0].name}</h1>
                        <p>capital {filteredCountries[0].capital}</p>
                        <p>population {filteredCountries[0].population}</p>
                        <h2>languages</h2>
                        <ul>
                            {filteredCountries[0].languages.map((lang, index) => <li key={index}>{lang.name}</li>)}
                        </ul>
                        <img src={filteredCountries[0].flag} alt={`flag of ${filteredCountries[0].name}`} width="200" />
                    </div>

                ))
            }

            {weather && (
                <div>
                    <h2>Weather in {weather.name}</h2>
                    <p>description: {weather.weather[0].description}</p>
                    <p>temperature: {weather.main.temp} Kelvin</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                </div>
            )}
        </div>
    )

}

export default App