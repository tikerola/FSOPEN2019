import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Form from './Form'
import Notification from './Notification'


import { getAll, postPerson, deletePerson, putPerson } from '../serverLogic'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        getAll()
            .then(response => setPersons(response))
    }, [])

    const showMessage = message => {
        setMessage(message)

        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    const handleSubmit = event => {
        event.preventDefault()
        const person = persons.find(person => person.name === newName)

        if (person) {
            if (!window.confirm(`Name ${newName} already exists, replace with a new number?`)) {
                showMessage('Update canceled!')
                return
            } else {
                putPerson(person.id, { ...person, number: newNumber })
                    .then(changedPerson => setPersons(persons.map(p => p.id !== person.id ? p : changedPerson)))
                    .catch(err => showMessage(`Could not update information from ${person.name}`))
                showMessage('Phone number updated')
                
            }
        } else {
            postPerson({ name: newName, number: newNumber })
                .then(response => setPersons([...persons, response]))
                .catch(err => showMessage('An error occured!'))
            showMessage('New person added')
        }

        setNewName('')
        setNewNumber('')
    }

    const handleDelete = id => {
        if (!window.confirm('Sure about eliminating a real person?')) {
            showMessage('Deletion canceled!')
            return
        }
        deletePerson(id).catch(err => showMessage('An error occured!'))
        
        setPersons(persons.filter(person => person.id !== id))
        showMessage('Deletion successful!')
    }

    const filterFolks = () => {
        return persons.filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person => <p key={person.id}>
                {person.name} {person.number} <button onClick={handleDelete.bind(this, person.id)}>delete</button>
            </p>)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            {message && <Notification message={message} />}
            <Filter text="filter shown with:" value={filter} setFn={setFilter} />

            <h2>Add a New</h2>
            <Form
                handleSubmit={handleSubmit}
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
            />
            <h2>Numbers</h2>
            {filterFolks()}
        </div>
    )

}

export default App