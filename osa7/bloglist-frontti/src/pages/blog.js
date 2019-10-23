
import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'

const Blog = ({ blog, username }) => {
  console.log(blog.user.username, username)

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

  return (
    <div>

      <div>
        <h1>{blog.title} {blog.author}</h1>
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
      { blog.user.username === username && <button onClick={handleRemove}>Remove</button>}

    </div>
  )

}

const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs.find(blog => blog.id === ownProps.match.params.id),
  username: state.user.username
})

export default connect(mapStateToProps)(Blog)