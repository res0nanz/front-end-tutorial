# Redux Tutorial Note

## Actions

アプリからStore（Redux）に送る唯一の情報源

ActionをStoreに送る: `store.dispatch()`

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

まとめてexportさせて再利用

```javascript
// importして利用
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

dispatchにCreatorごと渡す。bound action creatorを使えば、dispatch()を記述する必要がない

```javascript
dispatch(addTodo(text))
```
