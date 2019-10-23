
import React from 'react'
import { connect } from 'react-redux'

const User = ({ filteredBlogs }) => {

  return (
    <div>
      <h1>{filteredBlogs[0].user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        { filteredBlogs.map(blog => <li key={blog.id}>{blog.title}</li>) }
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  filteredBlogs: state.blogs.filter(blog => blog.user.id === ownProps.match.params.id)
})

export default connect(mapStateToProps)(User)