
import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { Input } from '../components/newBlogForm.styles'
import { Button } from '../components/Header.styles'
import { useField } from '../hooks/index'
import { update, removeBlog } from '../actions/blogs'

const commentStyles = {
  display: 'flex',
  alignItems: 'baseline',
  width: '95%',
  justifyContent: 'space-between',
  padding: '15px',
  background: '#333',
  borderRadius: '5px',
  margin: '0 auto'
}

const Blog = ({ blog, userId, update, removeBlog, history }) => {
  const [input, reset] = useField('text')

  const handleLike = async () => {

    const newBlog = {
      user: blog.user._id,
      likes: 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }


    const returnedBlog = await blogService.put(blog.id, newBlog)
    update(returnedBlog)

  }

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)

      removeBlog(blog.id)
      history.push('/')
    }
  }

  const handleNewComment = async () => {

    const returnedBlog = await blogService.postComment(blog.id, input.value)
    update(returnedBlog)
    reset()
  }

  if (!blog)
    return null

  return (
    <div style={{ marginTop: '30px' }}>
      <div>
        <h2 style={{ color: '#ddd' }}>{blog.title} by {blog.author}</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'start', fontSize: '0.9em', color: '#bbb' }}>
        <div style={{ marginRight: '30px' }}>
          Added by {blog.user.username}
        </div>
        <div style={{ marginRight: '30px' }}>
          {blog.likes} likes
        </div>
        <div>
          <a href={`http://${blog.url}`} style={{ textDecoration: 'none', color: 'inherit' }}>{blog.url}</a>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>

        <div>
          <Button onClick={handleLike}>like</Button>
        </div>
        <div>
          {(blog.user === userId || blog.user.id === userId) && <Button onClick={handleRemove}>Remove</Button>}
        </div>
      </div>
      <h3 style={{ marginTop: '50px' }}>comments</h3>
      <ul style={{ listStyleType: 'none', color: '#bbb' }}>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
      <div style={commentStyles}>
        <Input {...input} style={{ color: '#999' }} width='40%' placeholder='Write a comment' />
        <Button width='150px' onClick={handleNewComment}>add comment</Button>
      </div>


    </div>
  )

}

const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs.find(blog => blog.id === ownProps.match.params.id),
  userId: state.user.id
})

export default connect(mapStateToProps, { update, removeBlog })(Blog)