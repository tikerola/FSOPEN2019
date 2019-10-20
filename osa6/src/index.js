import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  anecdote: anecdoteReducer,
  message: messageReducer,
  filter: filterReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

const render = () => {
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)