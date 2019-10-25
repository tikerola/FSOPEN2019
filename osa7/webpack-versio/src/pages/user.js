
import React from 'react'
import { connect } from 'react-redux'
import { UsersContainer } from './users'

const User = ({ filteredBlogs }) => {

  if (filteredBlogs.length === 0)
    return null

  return (
    <UsersContainer >
      <h2 style={{ color: '#ddd' }}>{filteredBlogs[0].user.name}</h2>
      <h3 style={{ color: '#999' }}>Added blogs</h3>
      <ul style={{ listStyleType: 'none' }}>
        { filteredBlogs.map(blog => <li key={blog.id}>{blog.title}</li>) }
      </ul>
    </UsersContainer>
  )
}

const mapStateToProps = (state, ownProps) => ({
  filteredBlogs: state.blogs.filter(blog => blog.user.id === ownProps.match.params.id)
})

export default connect(mapStateToProps)(User)