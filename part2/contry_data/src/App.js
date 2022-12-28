import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"


const CountryList = ({ countries, nameFilter }) => {
  countries = countries.filter( contry => {
    console.log("country name in filter", contry.name.common)
    if (nameFilter === '') {
        return true
    }
    else if (contry.name.common.toLowerCase().includes(nameFilter.toLowerCase()) ) {
        return true
    } else {

        return false
    }
    
    }) 


    if (countries.length ===1) {
      return (
      
      <div>
          {countries.map( contry => {
          console.log("contry in list", contry)
          return(
            <div key = {contry.name.common}>
            <h2>{contry.name.common}</h2> 
            <p> capital:{contry.capital} </p>
            <p> area:{contry.area} </p>
            <h3> languages: </h3>
            <ul>
            {Object.keys(contry.languages).map((i)=>
            <li >
            {contry.languages[i]}
            </li>
            )}
            </ul>
            
            
            <img src={contry.flags.png}/>
        </div>
          
          )}
          )}
      </div>
      
      )
    }
    else if (countries.length <=10) {
      return (
      
      <div>
          {countries.map( contry => {
          console.log("contrys in list", contry)
          return(
            <div key = {contry.name.common}>
            {contry.name.common} 
        </div>
          
          )}
          )}
      </div>
      
      )
    }
    else {
      return <p>Too many matches, specify another filter</p>
    }
    
}

const App = () => {
  const [nameFilter, setNameFilter] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  return (
    <div>
      <Filter nameFilter= {nameFilter} setNameFilter = {setNameFilter}/>
      <CountryList countries = {countries} nameFilter = {nameFilter} />
        </div>
  );
}

export default App;