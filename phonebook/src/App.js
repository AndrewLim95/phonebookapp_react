import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneBookService from './services/phoneBook'

const Contact = ({person,delContact}) => {
  return (
      <li>{person.name} {person.number} <button onClick={delContact}>delete</button></li>
  )
} 

const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(initialPhoneBook => {
        setPersons(initialPhoneBook)
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
    phoneBookService
    .create(personObject)
    .then(returnedPhoneBook => {
      setPersons(persons.concat(returnedPhoneBook))
    })
  }

  const delContact = (event) => {
    event.preventDefault()
    
    phoneBookService
    .delete(event.target.id)
    .then(deletedPhoneBook => {
      setPersons(persons.pop(deletedPhoneBook))
    })
  }
  const handleNameChange = (event) => {
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
          onChange={handleNameChange} />
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
        <Contact key={person.id} person={person} delContact={delContact}/>)
        }

    </div>
  )
}

export default App