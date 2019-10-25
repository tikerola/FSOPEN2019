

export const setMessage = (message, time) => {

  return async dispatch => {

    dispatch({
      type: 'SET_MESSAGE',
      message
    })

    setTimeout(() => {
      dispatch({
        type: 'SET_MESSAGE',
        message: ''
      })
    }, time)
  }
}