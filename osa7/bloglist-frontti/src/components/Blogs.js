import React, { useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

import NewBlogForm from './newBlogForm'
import { connect } from 'react-redux'
import { setMessage } from '../actions/notification'
import { addToBlogs } from '../actions/blogs'

const Blogs = ({ user, blogs, addToBlogs, setMessage }) => {

  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (title, author, url) => {
    try {

      const res = await blogService.create({
        title,
        author,
        url
      })

      addToBlogs(res)
      setMessage(`${res.title} by ${res.author} added`, 3000)
    } catch (error) {
      console.log('error: ', error.message)
    }
  }

  return (
    <div>
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


const mapDispatchToProps = {
  setMessage,
  addToBlogs
}

export default connect(null, mapDispatchToProps)(Blogs)