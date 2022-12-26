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
                {person.name} {person.number}
            </p> 
            )}
            )}
        </div>
        
        )
    }
    
export default PersonList