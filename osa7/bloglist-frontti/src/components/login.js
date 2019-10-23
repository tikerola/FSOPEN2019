import React from 'react'
import { login } from '../services/login'
import blogServices from '../services/blogs'
import Notification from './notification'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { setMessage } from '../actions/notification'


const Login = props => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')

  const { message, setMessage } = props

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const user = await login({ username: username.value, password: password.value })
      console.log(user, '**********************************')
      
      if (!user.hasOwnProperty('name')) {
        throw new Error('Login failed')
      }

      props.setUser(user)
      blogServices.restoreToken(user.token)
      localStorage.setItem('savedUser', JSON.stringify(user))
    }
    catch (error) {
      setMessage('Wrong username or password', 3000)
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

const mapStateToProps = state => ({
  message: state.notification
})

const mapDispatchToProps = {
  setMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)