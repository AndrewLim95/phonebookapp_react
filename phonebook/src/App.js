import { useState } from 'react'

const Contact = ({ person }) => {
  return (
      <li>{person.name}</li>
  )
} 

const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    
    for (let i = 0; i < persons.length; i++) {
      console.log(persons[i].name)
      if ((persons[i].name) === newName){
        alert(`${newName} is already added to phonebook`)
      }
      else{
        const personObject = {
          id: persons.length + 1,
          name: newName
        }
        setPersons(persons.concat(personObject))
        setNewName('')
      }
    }
    return
  }

  
  const handleContactChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  console.log(persons)

  
  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addContact}>
        <div>
          name: <input 
          value={newName}
          onChange={handleContactChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Names</h2>
      {persons.map(person =>
        <Contact key={person.id} person={person}/>
      )}
    </div>
  )
}

export default App