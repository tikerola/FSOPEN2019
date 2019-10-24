import React from 'react'
import { BlogContainer } from './Blog.styles'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = (props) => {
  const { blog } = props

  Blog.propTypes = {
    blog: propTypes.object.isRequired
  }


  return (

    <BlogContainer>
      <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: '#ddd' }}>{blog.title} by {blog.author}</Link>
    </BlogContainer>

  )

}

export default Blog