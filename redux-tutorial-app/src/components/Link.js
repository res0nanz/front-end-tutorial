import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onClick }) => {
  // activeならそのまま
  if (active) {
    return <span>{children}</span>
  }

  // onClickを指定して返す
  return (
    <a
      href="" //ESLintだと警告
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link