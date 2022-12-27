import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import PersonList from "./components/PersonList"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    return(
       setNewName(event.target.value)
    )
  }

  const addNumber = (event) => {
    return(
      setNewNumber(event.target.value)
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = persons.findIndex( (person) => {
      console.log("newperson", person.name)
      return person.name ===   newName
    })
      console.log("newperson -1 if new", newPerson)
    if (newPerson === -1) {
      const newPerson = {
        name : newName,
        number : newNumber
      }
      setPersons( persons.concat(newPerson) )
      setNewName( "" )
      setNewNumber( "" )
      console.log("newperson created", newPerson)
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter = {nameFilter} setNameFilter = {setNameFilter} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson = {addPerson}
        newName = {newName}
        addName = {addName}
        newNumber = {newNumber}
        addNumber = {addNumber}
      />
      <h2>Numbers</h2>
      <PersonList persons = {persons} nameFilter = {nameFilter} />
    </div>
  )

}

export default App



