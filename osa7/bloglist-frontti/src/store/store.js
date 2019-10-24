import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from '../reducers/notificationReducer'
import blogsReducer from '../reducers/blogs'
import userReducer from '../reducers/user'
import usersReducer from '../reducers/users'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
  users: usersReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
