import React, { useState } from 'react'


const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show)
    return null

  const handleSubmit = async e => {
    e.preventDefault()
    const result = await props.login({
      variables: {
        username,
        password
      }
    })

    const token = result.data.login.value
    props.setToken(token)

    localStorage.setItem('books-token', token)
  }

  return (
    <form onSubmit={handleSubmit}>
      username: <input value={username} onChange={({ target }) => setUsername(target.value)} />
      password: <input value={password} onChange={({ target }) => setPassword(target.value)} />
      <button>send</button>
    </form>
  )
}

export default Login