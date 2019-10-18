import React, { useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Notification from './notification'
import NewBlogForm from './newBlogForm'

export default ({ user, blogs, setBlogs }) => {

  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)


  const handleLogout = () => {
    localStorage.removeItem('savedUser')
    blogService.restoreToken('')
  }

  const setNotification = notification => {
    setMessage(notification)

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }


  const handleSubmit = async (title, author, url) => {
    try {

      const res = await blogService.create({
        title,
        author,
        url
      })

      setBlogs([...blogs, res])
      setNotification(`${res.title} by ${res.author} added`)
    } catch (error) {
      console.log('error: ', error.message)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      {message && <Notification message={message} />}
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      {showForm ?
        <NewBlogForm
          handleSubmit={handleSubmit}
          setShowForm={setShowForm}
        />
        :
        <button onClick={() => setShowForm(true)}>new note</button>}

      {blogs.sort((a, b) => b.likes - a.likes).map(blog => {
        return <Blog key={blog.id} blog={blog} user={user} />
      })}

    </div>
  )
}