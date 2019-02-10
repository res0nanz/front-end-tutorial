# Redux Tutorial Note

## Actions

* アプリからStore（Redux）に送る唯一の情報源
* ActionをStoreに送る: `store.dispatch()`

### Todoを追加するActionの例

```javascript
// type（一般的に文字列による定数）
const ADD_TODO = 'ADD_TODO'

// this is action
{
  // Actionにはtypeが必須
  type: ADD_TODO,
  // 渡す情報。何をいくつ渡してもよいが、なるべく小さくする
  text: 'Build my first Redux app'
}
```

### Typeを別ファイルにまとめる

* まとめてexportさせて再利用
* importして利用

```javascript
import {ADD_TODO, REMOVE_TODO} from '../actionTypes'
```

### Action Creators

```javascript
// Todoを追加するActionを作成するCreator
function addTodo(text) {
  // action
  return {
    type: ADD_TODO,
    // 引数をStoreへ渡す場合は中身不要
    text
  }
  // dispatch(action) Creatorにdispatchは不要。
}
```

* dispatchにCreatorごと渡す
* bound action creatorを使えば、dispatch()を記述する必要がない

```javascript
dispatch(addTodo(text))
```

## Reducers

* Reducersはアプリケーションにおける状態の変化の仕方（=State Shape）を決める
* Actionsは何かが起きたという事実だけを示す

### State Shape

* コードを書く前に設計する
* データとUIは分ける
* なるべくネストしない
* お互いを参照しない

```javascript
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
```

### Handing Actions

* Reducersは1つ前のstateとactionから次のstateを返す純粋関数

```javascript
(previousState, action) => newState
```

* してはならない3つ
  * 引数に手を加えない（副作用の一部ともいえる
  * 副作用を起こさない
    * 例）APICallやページ遷移
    * 副作用
      * 関数の引数以外の入力に出力が依存していないか
      * 関数外部(return以外)への出力はないか
      * ローカル変数以外を操作していないか
  * 純粋ではない関数をcallしない
    * 純粋関数
      * ある入力Xに対し、唯一の出力Yがある（=参照透過性）
      * 他に影響を与えない
* switchにて型(action.type)を判別、処理を分ける
* デフォルトでは、引数をそのまま返す

```javascript
switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
```

* Object.assignの使い方に注意が必要
  * 第一引数を空にする必要がある
  * 空にすることで、第二引数以降（を1つにしたオブジェクト）のコピーができる
  * 同じプロパティは上書き

```javascript
Object.assign({}, state, {newProperty: newValue})
```

### Handing More Actions

* 必ずstateを直接操作することなく、新たなオブジェクトとして返す
* actionとそれまでのstateから新しく構成する

```javascript
return Object.assign({}, state, {
  todos: [
    // これまでのstate
    ...state.todos,
      // action
      {
        text: action.text,
        completed: false
      }
    ]
  })
```

* 配列のうち特定の要素だけ変更したいときもmap関数と条件分岐で対処
  * 頻繁であれば、それ用のライブラリを使うも良い
* とにかく、まず、複製。直接変更しない

### Splitting Reducers

* Reducer composition
  * Redux基本パターン
  * すべてのtypeに対して1つのreducerで対応しない
  * typeを区切り（ここではtodosとvisiblity_filter）、子reducerに任せる
* rootのreducerは子reduerを呼ぶだけにできる
  * そのためには、引数の初期値を用意する必要がある
  * 子reducer自身の担当箇所以外について初期値を返すため
* 子reducerごとにファイルを分けるとなお良い
* combineReducers()
  * 複数のreducerを呼び出す関数の生成
  * オブジェクトのキーにより対応づけられる
  * 各reducerから返された結果を1つのオブジェクトにまとめる

```javascript
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

// 上と下は同じ

function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
```

