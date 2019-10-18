import React, { useState } from 'react'
import blogService from '../services/blogs'
import propTypes from 'prop-types'

const Blog = (props) => {
  const [showMinimal, setShowMinimal] = useState(true)
  const { blog, user } = props

  Blog.propTypes = {
    blog: propTypes.object.isRequired,
    user: propTypes.object.isRequired
  }

  const styles = {
    padding: 10,
    borderWidth: 1,
    borderBottom: 'solid red',
    width: '50%'
  }

  const handleLike = async () => {

    const newBlog = {
      user: blog.user._id,
      likes: 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }


    await blogService.put(blog.id, newBlog)

  }

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`))
      await blogService.remove(blog.id)
  }

  if (showMinimal)
    return (
      <div style={styles}>
        <div onClick={() => setShowMinimal(false)} className="maximize">
          {blog.title} {blog.author}
        </div>
      </div>
    )

  return (
    <div style={styles}>

      <div onClick={() => setShowMinimal(true)} className="minimize">
        {blog.title} {blog.author}
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>
        Added by {blog.user.username}
      </div>
      { blog.user.username === user.username && <button onClick={handleRemove}>Remove</button>}

    </div>
  )

}

export default Blog