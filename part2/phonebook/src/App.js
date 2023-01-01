import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
//import PersonList from "./components/PersonList"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState(null)

      

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(dbPersons => {
        setPersons(dbPersons)
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

  const updatePerson = (personObject) => {
    const person = persons.find(id => id.name === personObject.name)
    
    
    if (window.confirm(`${person.name} is already in contacts. Do you want to update number?` )) {
      personService
        .update(person.id, personObject)
        .then(retPerson => {
          
          setPersons(persons.map(p => p.id !== person.id ? p : retPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Updated ${personObject.name}'s number to ${personObject.number}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification(`Information of ${personObject.name} has already been removed from browser`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNumber
    }
    const newPerson = persons.findIndex( (person) => {
      return person.name ===   newName
    })
    if (newPerson === -1) { 
      personService
        .create(personObject)
        .then(retPerson => {
          setPersons(persons.concat(retPerson))
          setNewName('')
          setNewNumber('')
          })
      setNotification(`Added ${personObject.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    else {
      updatePerson(personObject)
    }
  }
  const removePerson = (selectedPerson) => {
    if (window.confirm(`Delete ${selectedPerson.name}?`)) {
      personService.removePerson(selectedPerson)
        .then(data => {
          setNotification(`Removed ${selectedPerson}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {

    })
  }

  const PersonList = ({ persons, nameFilter }) => {
    
    persons = persons.filter( person => {
    console.log("person name in filter", person.name)
    if (nameFilter === '') {
        return true
    }
    else if (person.name.toLowerCase().includes(nameFilter.toLowerCase()) ) {
        return true
    } else {

        return false
    }
    
    })
    return (
    
    <div>
        {persons.map( person => {
        console.log("person in list", person)
        return(
        <p key = {person.name}>
            {person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
        </p> 
        
        
        
        )}
        )}
    </div>
    
    )
}

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage message={notification}/>
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
      <PersonList persons = {persons} nameFilter = {nameFilter} removePerson = {removePerson} />
      
    </div>
  )

}

const NotificationMessage = ({message}) => {
  const messageStyling = {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '15px'
  }

  if (message === null) {
    return null
  }
  return (
    <div style={messageStyling}>
        {message}
    </div>
  )
    
}
}

export default App



