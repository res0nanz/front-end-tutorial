// actionのimport
import { ADD_TODO, TOGGLE_TODO } from '../actions/index'


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

export default todos