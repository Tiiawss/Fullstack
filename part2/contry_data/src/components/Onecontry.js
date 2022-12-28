import { useState, useEffect } from 'react'
import axios from 'axios'

const Onecontry = ({ contry }) => {
    const [weather, setWeather] = useState(undefined)
    const api_key = process.env.REACT_APP_API_KEY
    
    

    const hook = () => {
        console.log('effect')
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${contry.capital}&appid=${api_key}&units=metric`)
          .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            setWeather(response.data)
          })
      }
      useEffect(hook, [])
    return (
      <div>
        <h2>{contry.name.common}</h2>
        <p>capital:{contry.capital}</p>
        <p>area:{contry.area}</p>
        <h3>languages:</h3>
        <ul>
            {Object.keys(contry.languages).map((i)=>
            <li >
            {contry.languages[i]}
            </li>
            )}
            </ul>
        <img src={contry.flags.png} />
        <p>Weather in {contry.capital}</p>
        <p>temperature {weather?.main.temp} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} />
        <p>wind {weather?.wind.speed} m/s </p>
      </div>
    )
  }

export default Onecontry