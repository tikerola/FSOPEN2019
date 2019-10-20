import React from 'react'
import { create } from '../actions/anecdotes'
import { addMessage } from '../actions/message'
import { connect } from 'react-redux'


const AnecdoteForm = ({ create, addMessage }) => {

    const handleSubmit = async e => {
        e.preventDefault()
        const newAnecdote = {
            content: e.target.anecdote.value,
            votes: 0
        }
        e.target.anecdote.value = ''
        create(newAnecdote)
        
        addMessage(newAnecdote.content, 5)
        
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}



export default connect(null, { create, addMessage })(AnecdoteForm)