// typeを外からimportできるように宣言
// 定数のため何度も書かない
// ソース序盤にまとめて見やすくする効果も
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

// 一緒に必要になる定数も書いておく
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

// ActionCreator
// todoの状態（on,off）を入れ替える
export function toggleTodo(index) {
  // Action
  // TodoをArrayで管理するため、indexを持たせる
  // 実際のアプリでは、indexではなく、もっとuniqueなidにする
  return { type: TOGGLE_TODO, index}
}

// todoを追加するActionのためのActionCreator
export function addTodo(text) {
  return { type: ADD_TODO, text }
}

// 表示切り替えるためのActionのためのActionCreator
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}