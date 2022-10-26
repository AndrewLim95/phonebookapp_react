import { useState, useEffect } from 'react'
import axios from 'axios'

const Contact = ({person}) => {
  return (
      <li>{person.name} {person.number}</li>
  )
} 

const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPerson = persons.filter(person=> person.name.toLowerCase().includes(newFilter.toLowerCase()))
  console.log(filteredPerson)

  const addContact = (event) => {
    event.preventDefault()
    for (let i = 0; i < persons.length; i++) {
      console.log(persons[i].name)
      if ((persons[i].name) === newName || (persons[i].number) === newNumber){
        alert(`${newName}, ${newNumber} is already added to phonebook`)
        return
      }
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewNumber('')
    setNewName('')
  }
  
  const handleContactChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  console.log(persons)

  
  return (
    <div>
      <h2>Phonebook</h2>
        filter: <input
        value={newFilter}
        onChange={handleFilterChange}/>
      <h3>Add a new Contact:</h3>
      <form onSubmit={addContact}>
        <div>
          name: <input 
          value={newName}
          onChange={handleContactChange} />
          number: <input 
          value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Name, Number</h2>
        {filteredPerson.map(person => 
        <Contact key={person.id} person={person}/>)
        }

    </div>
  )
}

export default App