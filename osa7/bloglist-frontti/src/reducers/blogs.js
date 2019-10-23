

export default (state = [], action) => {
  switch(action.type) {
  case 'INITIALIZE':
    return action.blogs
  case 'ADD':
    return state.concat(action.blog)
  default:
    return state
  }
}