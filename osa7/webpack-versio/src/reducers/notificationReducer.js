
export default (state = '', action) => {
  switch(action.type) {
  case 'SET_MESSAGE':
    return action.message

  default:
    return state
  }
}