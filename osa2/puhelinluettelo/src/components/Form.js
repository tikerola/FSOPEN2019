import React from 'react'
import Input from './Input'

export default ({ handleSubmit, newName, newNumber, setNewName, setNewNumber }) => {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input text="name:" value={newName} setFn={setNewName} />
                <Input text="number:" value={newNumber} setFn={setNewNumber} />

                <button type="submit">add</button>

            </form>
        </div>
    )
}