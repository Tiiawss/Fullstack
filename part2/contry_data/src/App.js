import { useState, useEffect } from 'react'
import axios from 'axios'
import ContryList from "./components/ContryList"
import Onecontry from "./components/Onecontry"




const Filter = ({ value, onChange }) => 
  <div>
    find countries<input value={value} onChange={onChange}/>
  </div>

const App = () => {

  
  const [contries, setContries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [listContry, setListContry] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        
        setContries(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setListContry([])
  }
  
  const handleShowChange = (event) =>
    setListContry(event)

  return (
    <>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <ContryList contries={contries} filter={newFilter} listContry={listContry} handleshow={handleShowChange}/>
    </>
  )
}

export default App