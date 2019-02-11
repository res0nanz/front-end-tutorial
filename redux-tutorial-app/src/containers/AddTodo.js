import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions/index'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          // submitによる送信の前に下の処理をする
          e.preventDefault()
          // 空ならそのまま
          if (!input.value.trim()) {
            return
          }
          // inputをもとにしたactionをstoreへdispatch
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}
// presentationalもcontainerも自分でこなすため
AddTodo = connect()(AddTodo)

export default AddTodo