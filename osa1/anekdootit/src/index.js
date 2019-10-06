import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))


    const handleChangeAnecdote = () => {
        const rnd = Math.floor(Math.random() * anecdotes.length)
        setSelected(rnd)
    }

    const handleVote = () => {
        const votesCopy = [...votes]
        votesCopy[selected] += 1
        setVotes(votesCopy)
    }

    const indexOfMostVoted = () => {
        const max = Math.max(...votes)

        return votes.findIndex(vote => vote === max)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
            <p>has {votes[selected]} votes</p>
            <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleChangeAnecdote}>next anecdote</button>
            </div>
            <h1>Anecdote with most votes</h1>
            {anecdotes[indexOfMostVoted()]}
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)