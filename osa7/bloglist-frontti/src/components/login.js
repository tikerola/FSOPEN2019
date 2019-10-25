import React from 'react'
import { login } from '../services/login'
import blogServices from '../services/blogs'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { setMessage } from '../actions/notification'
import { Button } from './Header.styles'
import { Input, Label } from './newBlogForm.styles'
import Logo from '../assets/penandpaper.png'




const Login = props => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')

  const { setMessage } = props

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const user = await login({ username: username.value, password: password.value })

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
    <div style={{ width: '60%', margin: '70px auto 0' }}>
      <h2 style={{ color: '#ddd' }}>Log in to application</h2>
      <img src={Logo} width='200' />

      <form >
        <div>
          <Label htmlFor="username" style={{ width: '100px', color: '#bbb' }}>username: </Label>
          <Input {...username} style={{ width: '250px' }} />
        </div>

        <div>
          <Label htmlFor="password" style={{ width: '100px', color: '#bbb' }}>password: </Label>
          <Input {...password} style={{ width: '250px' }} />
        </div>

        <Button onClick={handleSubmit} style={{ marginTop: '20px' }}>login</Button>
      </form>
    </div>

  )
}


const mapDispatchToProps = {
  setMessage
}

export default connect(null, mapDispatchToProps)(Login)