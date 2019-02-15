import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPostsIfNeeded } from './actions/index'
import rootReducer from './reducers/index'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // ActionCreatorsの返す関数をdispatchできるようにする（ミドルウェア）
    loggerMiddleware // Actionのログをとるミドルウェア
  )
)

//板を選ぶ
store.dispatch(selectSubreddit('reactjs'))
// 投稿を取得
store.dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()))