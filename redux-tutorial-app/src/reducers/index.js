// combineReducers
import { combineReducers } from 'redux'
// actionのimport
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from '../actions/index'
// オブジェクトのキーを抜き出す
const { SHOW_ALL } = VisibilityFilters

// typeがvisibility_filterに関するreducer
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

// typeがtodoに関するreducer
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        // これまでのstateを展開
        ...state,
        // 新しいプロパティを付与、上書き
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        // 複製のうち、条件に合う要素のみ処理
        if (index === action.index) {
          return Object.assign({}, todo, {
            // （あくまで複製の）プロパティを書き換える
            completed: !todo.completed
          })
        }
        return todo
      })
    // デフォルトはそのまま返す
    default:
      return state
  }
}

// root
// 1つのstateを複数のreducerに分担。結果をまとめる
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

// 外部へエクスポート
export default todoApp