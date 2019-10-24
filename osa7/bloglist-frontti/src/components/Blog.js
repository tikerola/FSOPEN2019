import React from 'react'

import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = (props) => {
  
  const { blog } = props

  Blog.propTypes = {
    blog: propTypes.object.isRequired
  }

  const styles = {
    padding: 10,
    borderWidth: 1,
    borderBottom: 'dashed #bbb',
    width: '90%'
  }

  return (
    <div style={styles}>
      <div className="maximize">
        <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>{blog.title} {blog.author}</Link>
      </div>
    </div>
  )

 
}

export default Blog