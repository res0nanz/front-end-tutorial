// combineReducers
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

// root
// 1つのstateを複数のreducerに分担。結果をまとめる
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

// 外部へエクスポート
export default todoApp