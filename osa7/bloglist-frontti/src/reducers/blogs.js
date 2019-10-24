

export default (state = [], action) => {
  switch(action.type) {
  case 'INITIALIZE':
    return action.blogs
  case 'ADD':
    return state.concat(action.blog)
  case 'UPDATE':
    return state.map(blog => blog.id === action.blog.id ? action.blog : blog)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  default:
    return state
  }
}