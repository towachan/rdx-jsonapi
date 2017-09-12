import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducers'
import App from './Containers/App'

const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

render(<App store={store} />, document.getElementById('root'))
