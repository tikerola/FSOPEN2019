
import blogService from '../services/blogs'

export const initialize = () => {

  return async dispatch => {
    const response = await blogService.getAll()

    dispatch({
      type: 'INITIALIZE',
      blogs: response
    })

  }
}

export const addToBlogs = blog => {
  return {
    type: 'ADD',
    blog
  }
}

export const update = blog => {

  return {
    type: 'UPDATE',
    blog
  }
}

export const removeBlog = id => ({
  type: 'REMOVE_BLOG',
  id
})