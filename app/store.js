import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import rootReducer from './redux'
import { createLogger } from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk

let middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  thunkMiddleware.withExtraArgument({ axios })
]
if (process.browser) {
  // We'd like the redux logger to only log messages when it's running in the
  // browser, and not when we run the tests from within Mocha.
  middleware = [...middleware, createLogger({ collapsed: true })]
}

export default createStore(
  rootReducer,
  applyMiddleware(...middleware)
)
