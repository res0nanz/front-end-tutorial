// fetch()を使う場所に記述
import fetch from 'cross-fetch'

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

export const REQUEST_POSTS = 'REQUEST_POSTS'
export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

// 使い方は他のActionCreatorと同じ
// store.dispatch(fetchPosts('reactjs'))
function fetchPosts(subreddit) {
  // dispatchメソッドが渡されたら、dispatchメソッドがActionをdispatchできるようにする
  return function (dispatch) {
    // APIを呼び出し、状態が更新されたことを伝える
    dispatch(requestPosts(subreddit))
    // Thunkミドルウェアによって呼び出された関数は値を返せる
    // その値はdispatchメソッドへ渡る
    // 渡された値はdispatchメソッドの戻り値になる
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    　.then(
        response => response.json(),
        // catchは使わない
        // dispatchとそれに続く描画のエラーすべてをcatchしてしまうため
        // エラーのループを引き起こしてしまう
        error => console.log('An error occured.', error)
      )
      // 何度でもdispatchできる
      // APIの呼び出し結果で状態を更新する
      .then(
        // メソッドはつながっているため、json === response.json()
        json => dispatch(receivePosts(subreddit, json))
      )
  }
}

// fetchするのか
function shouldFetchPosts(state, subreddit) {
  // reducersの結果を格納
  const posts = state.postsBySubreddit[subreddit]
  // 応じてbooleanを返す
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  // 関数はgetState()も受け取ることに注意
  // 次に何をdispatchするか選択できる
  // これはキャッシュされた値が利用できるとき、
  // ネットワークリクエストを避けるために有効

  return (dispatch, getState) => {
    // getStateとsubredditからfetchするかどうか
    if (shouldFetchPosts(getState(), subreddit)) {
      // thunkからthunkをdispatch
      return dispatch(fetchPosts(subreddit))
    } else {
      // 呼び出しに、待つべきものはないと知らせる
      return Promise.resolve()
    }
  }
}