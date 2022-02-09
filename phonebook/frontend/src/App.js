import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AddContact } from './components/AddContact'
import { FindContacts } from './components/FindContacts'
import { Contacts } from './components/Contacts'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ number, setNumber ] = useState('')

  useEffect(() => {
    axios
      .get('/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <div id="notification"></div>
      <FindContacts contacts={persons} />
      <h2>add new</h2>
      <AddContact
        persons={persons}
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
       />
      <h2>Numbers</h2>
      <Contacts contacts={persons} />
    </div>
  )
}

export default App