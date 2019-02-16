import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import App from './components/App'
// import rootReducer from './reducers'
import todoApp from './reducers/index'
import Root from './components/Root'

// const store = createStore(rootReducer)
const store = createStore(todoApp)

render(<Root store={store} />, document.getElementById('root'))