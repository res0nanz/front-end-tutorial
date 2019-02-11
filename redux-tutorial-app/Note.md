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

## Store

* Acctionsはwhat happendを代表するもの
* ReducersはActionに基づいてstateを更新（させるルールを示す）
* Storeは1つアプリケーションに1つ
  * Reducers compositionを利用することで1つに限定する
* ReducerからStoreを簡単に生成できる
  * 第二引数に初期状態を渡すこともできる

```javascript
import { createStore } from 'redux'
// Reducers composition
import todoApp from './reducers'
// 生成
const store = createStore(todoApp)
```

* `getState()`でアクセスを許可
* `dispatch(action)`で更新
* `subscribe(listener)`でリスナーを登録
* `subscribe(listener)`から返される関数（を呼び出して）リスナーの登録を解除
* なんのUIもなくともconsole.logで確認できる
  * UIを考える前にStore, Actions, Reducersで確認、テスト

## Data Flow

* Reduxのアーキテクチャは厳しい一方通行
  * お互いに関与しない構造
  * 同じようなデータをいくつも作らずに済む

### 1.`store.dispatch(action)`

* Actionは小さなnewsだと考える
* 以下は、「MaryがNo.42のarticleをlike」や「TodoにRead the Redux docsを追加」を表す
* どこからでも呼び出せる

```javascript
 { type: 'LIKE_ARTICLE', articleId: 42 }
 { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
 { type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

### 2.Redux store calls the reducer

* 現在のstateとactionを渡して、次のstateを受け取る
* reducerは純粋関数（参照透過性が必要）

```javascript
let nextState = todoApp(previousState, action)
```

### 3.The root reducer may combine the output of multiple reducers

* combineReducersはreducerの分割に役立つ
* 結果をまとめるのも勝手にやってくれる

### 4.Store saves the complete state

* このタイミングで`store.subscribe(listener)`で登録されたリスナーが呼び出される
* リスナーは`store.getState()`で現在の状態を取得できる
* 画面に反映するには、React Reduxなどを使っていれば`component.setState(newState)`が呼ばれる

## Usage with React

* ReduxはReact以外（Angular, jQuery, pureJSなど）でも使える
* React, DekuはUIを状態の関数として描画でき相性がいい
* `npm install --save react-redux`

### Presentational and Container Components

||Presentational|Container|
|-|-|-|
|目的|見え方|動き方|
|Reduxについて|気づかない|気づく|
|データの読み込み|propsから読み取る|Redux stateを購読する|
|データの変化|propsからcallbackを呼びだす|Redux actionを送る|
|書かれ方|手書き|React Reduxによって生成|

* 書くのは、ほぼPresentational
* Redux storeとの接続にContainerが必要
* Containerは複雑になりがち
* そのときは、コンポーネントツリー内にもう1つContainerを
* なるべくContainerは手書きしない
* React Reduxの`connect()`に頼るべき

### Designing Component Hierarchy

* UI（state object）の階層・構造設計は[Thinking in React – React](https://reactjs.org/docs/thinking-in-react.html)にて勉強しろ

### Designing Presentational Components

Presentational Componentは見え方しかない。どこから、どのようにしてデータを変化させる、与えられるのか知らない。与えられものをただ見えるにすぎない

* TodoList - Todoリストを表示する
  * todos:Array - Todoの配列, 中身は {id, text, completed}
  * onTodoClick(id:number) - callback, Todoをクリックで呼び出される
* Todo - 1つ1つのTodo
  * text:string - 表示テキスト
  * completed:boolean - 完了しているか
  * onClick() - callback, Todoをクリックで呼び出される
* Link - callbackが結びついたリンク
  * onClick() - callback, リンクをクリックで呼び出される
* Footer - 表示項目を変更する
* App - root, その他すべて

### Designing Container Components

* VisibleTodoList - Storeを購読して現在のフィルターにより、描画するTodoを選ぶ。TodoListを描画する
* FilterLink - 現在のフィルターを得て、Linkを描画する。クリックに応じたActionをdispatchする
  * filter:string - フィルターそのもの

### Designing Other Components

* formと関数が結びついたものなど、PresentationalとContainerを迷うものもある
* 2つに分けるのはアプリが大きくなってからでも良い
* AddTodo - 追加ボタンのついたform

### Implementing Presentational Components

* ローカルのstateやライフサイクルメソッドが不要であれば、stateを持たない関数として実装する
* 関数ではなくClassであってもよい
* なるべく関数にしておくべき

### Implementing Container Components

* Presentational ComponentをReduxにつなげるために Container Componentが必要
* `store.subscribe()`で状態ツリーを取得、propsをPresentational Componentに渡す
* 上を手書きするより、`connect()`を使う
* `connect()`には`mapStateToProps`という特別な関数が必要
  * 現在のRedux storeをpropsに変換する
  * 包括するPresentational Componentに渡すべために

```javascript
// 現在のstateからPresentational ComponentのTodoListに渡すtodosを求める
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}
// connectのために用意
const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```

* `mapDispatchToProps`関数もある
  * Actionのdispatchが目的
  * dispatchを受け取り、callbackとなるpropsを返す

```javascript
const mapDispatchToProps = dispatch => {
  // propsとして返す
  return {
    // TodoList(Presentational Component)のcallbackに対応
    onTodoClick: id => {
      // dispatchを設定
      dispatch(toggleTodo(id))
    }
  }
}
```

* Container Componentとして`connect()`する

```javascript
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

### Passing the Store

* すべてのComponentsはRedux Storeにアクセスしなければならない
* Storeを購読する（状態を把握する）ため
* 全てに対し、Propsとして渡すこともできるが、やるべきでない
* `<Provider>`という特別なReact ReduxのComponentを使うことで魔法のように解決する
* root Componentを描画するときに囲うだけでよい
