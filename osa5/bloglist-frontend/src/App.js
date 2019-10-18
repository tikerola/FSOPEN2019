import React, { useState, useEffect } from 'react'
import Login from './components/login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'


function App() {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    blogService.getAll()
      .then(response => {
        setBlogs(response)
      })
  }, [])

  useEffect(() => {
    const jsonResponse = localStorage.getItem('savedUser')

    if (jsonResponse) {
      const user = JSON.parse(jsonResponse)
      setUser(user)
      blogService.restoreToken(user.token)
    }
  }, [])

  return (
    <div>
      {user
        ?
        <Blogs user={user} blogs={blogs} setBlogs={setBlogs}/>
        :
        <Login setUser={setUser} />}
    </div>
  )
}

export default App
