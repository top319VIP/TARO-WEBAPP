import { createStore, applyMiddleware, compose } from 'redux'
// 引入需要的中间件
import thunkMiddleware from 'redux-thunk'
// 引入根reducers
import rootReducer from '../reducers'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

// 创建 store
export default function configStore () {
  const store = createStore(rootReducer, enhancer)
  return store
}
