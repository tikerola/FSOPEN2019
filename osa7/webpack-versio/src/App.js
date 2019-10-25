import React, { useEffect, useCallback } from 'react'

import blogService from './services/blogs'
import { connect } from 'react-redux'
import { initialize } from './actions/blogs'
import { setUser } from './actions/user'
import { setUsers } from './actions/users'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import Header from './components/Header'
import Users from './pages/users'
import User from './pages/user'
import Login from './components/login'
import Blog from './pages/blog'
import Notification from './components/notification'
import './App.css'


function App({ initialize, user, setUser, setUsers, message, blogs }) {

  useEffect(() => {
    initialize()
  }, [initialize])

  const usersFetch = useCallback(() => {
    setUsers()
  }, [setUsers])

  useEffect(() => {
    usersFetch()
  }, [blogs, usersFetch])

  useEffect(() => {
    const jsonResponse = localStorage.getItem('savedUser')

    if (jsonResponse) {
      const userFromStorage = JSON.parse(jsonResponse)
      setUser(userFromStorage)
      blogService.restoreToken(userFromStorage.token)
    }
  }, [setUser])

  return (
    <div className="main-container">
      <Router>
        <div className="app-container">
          <Header />
          <div className='app-content'>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <h1>Blog app</h1>
              
            </div>
            {message && <Notification message={message} />}
            <Route exact path='/' render={() => user.hasOwnProperty('name') ? <Home /> : <Login setUser={setUser} />} />
            <Route exact path='/users' component={Users} />
            <Route exact path='/users/:id' component={User} />
            <Route exact path='/blogs/:id' component={Blog} />
          </div>
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  message: state.notification,
  blogs: state.blogs
})

const mapDispatchToProps = {
  initialize,
  setUser,
  setUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
