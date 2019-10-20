import React from 'react'
import { vote } from '../actions/anecdotes'
import { addMessage } from '../actions/message'
import { connect } from 'react-redux'

const AnecdoteList = ({ filteredAnecdotes, vote, addMessage }) => {
    
    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            vote(anecdote.id)
                            addMessage(`${anecdote.content} voted`, 5)   
                        }}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const anecdotesToShow = ({ anecdote, filter }) => {
    return anecdote.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = state => ({
    filteredAnecdotes: anecdotesToShow(state)
    
})

const mapDispatchToProps = {
    vote,
    addMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)