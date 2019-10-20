import React, { useEffect } from 'react';

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { initialize } from './actions/anecdotes'

const App = ({ initialize }) => {
  
  useEffect(() => {
    initialize()
    
  }, [initialize])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter /> 
      <AnecdoteForm /> 
      <AnecdoteList />
    </div>
  )
}

export default connect(null, { initialize })(App)