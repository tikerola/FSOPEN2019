import usersService from '../services/users'

export const setUsers = () => {

  return async dispatch => {

    const users = await usersService.getAll()

    dispatch({
      type: 'SET_USERS',
      users
    })
  }
}