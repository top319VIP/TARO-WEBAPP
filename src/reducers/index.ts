import { combineReducers } from 'redux'
import counter from './counter'

export default combineReducers({
  counter // 每个模块可以拆分为单独的store, 可以通过redux拆分store
})
