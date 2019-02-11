import React from 'react'
import PropTypes from 'prop-types'

// Classではなく関数として定義
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Todo.propTypes = {
  // 関数型,必須
  onClick: PropTypes.func.isRequired,
  // boolean,必須
  completed: PropTypes.bool.isRequired,
  // string, 必須
  text: PropTypes.string.isRequired
}

export default Todo