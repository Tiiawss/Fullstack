const PersonForm = ({ addPerson, newName, addName, newNumber, addNumber }) => {
    console.log(addPerson, newName, addName, newNumber, addNumber)
    return (
      <form onSubmit={addPerson}>
          <div>
            name: 
            <input
              value={newName}
              onChange={addName}
            />
          </div>
          <div>
            number:
            <input
              value={newNumber}
              onChange={addNumber}
            />
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
      </form>
    )
  
  }
export default PersonForm