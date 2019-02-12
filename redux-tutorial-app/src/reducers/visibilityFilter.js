import { SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/index'
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

export default visibilityFilter