import React, { useState } from 'react'
import { login } from '../services/login'
import blogServices from '../services/blogs'
import Notification from './notification'
import { useField } from '../hooks/index'

const Login = props => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')


  const [message, setMessage] = useState('')

  const setNotification = notification => {
    setMessage(notification)

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  const handleSubmit = async e => {
    
    e.preventDefault()
    try {
      
      const user = await login({ username: username.value, password: password.value })
      
      if (!user) {
        throw new Error('Login failed')
      }

      props.setUser(user)
      blogServices.restoreToken(user.token)
      localStorage.setItem('savedUser', JSON.stringify(user))
    }
    catch (error) {
      setNotification('Wrong username or password')
      usernameReset()
      passwordReset()
    }
  }

  return (
    <div>
      <h1>Log in to application</h1>
      { message && <Notification message={message} />}

      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="username">username: </label>
          <input {...username} />
        </div>

        <div>
          <label htmlFor="password">password: </label>
          <input {...password} />
        </div>

        <button>login</button>
      </form>
    </div>

  )
}

export default Login