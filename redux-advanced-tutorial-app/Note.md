# Redux Advanced Tutorial

* Rddit - 2chぽいサイト
* subreddit - 2chにおける「板」
* 掲示板（の超簡単ver）アプリを制作する

## Async Action

* Async - 非同期
* Actionがdispatchされるとすぐにstateが更新 - 同期。従来
* 非同期APIの大事な2つの瞬間
  * 呼び出された瞬間
  * レスポンスを受け取る（もしくはタイムアウト）瞬間
  * Actionをdispatchして、状態を更新することが一般的 - 同期が一般的
* 3つのActionをdispatchする必要がある
  * Reducerにリクエストの「開始」を伝えるAction
  * Reducerにリクエストの「成功」を伝えるAction
  * Reducerにリクエストの「失敗」を伝えるAction
  * やり方は2通り
    * 3つをそれぞれ異なるActionTypeを使うか - チュートリアルではこちら
    * 1つを使いstatus項目で区別するか
    * アプリケーションで統一すること

### Synchronous Action Creators

* SELECT_SUBREDDIT - 板を選ぶ
* INVALIDATE_SUBREDDIT - 板の再読み込み
* 2つはユーザー操作に左右されるAction（逆はネットワークリクエストに左右されるAction）
* REQUEST_POSTS - 板の投稿を取得
  * SELECT_SUBREDDIT, INVALIDATE_SUBREDDITと分離することが大切
  * 連続して起きることもある（だから、一緒にしたくもなる）
  * しかし、それ以上にユーザー操作のActionに関係なく、独立していてほしいことも往々にしてある
  * 例）一番人気のsubredditをフェッチ（取得）、古いデータをリフレッシュなど
  * 初期の段階で、取得と特定のUIイベントを一緒にするのは、賢いやり方でない
* RECEIVE_POSTS - ネットワークのリクエストが成功したレスポンスを受け取った
* 実際には、失敗レスポンスに対するエラーハンドリングも実装する

RECEIVE_POSTSはネットワークリクエストに左右されるActionといえるのか？

### Designing the State Shape

* basic tutorial同様、アプリケーションにおけるstateについて設計しておく
* どの情報が非同期アプリケーションの状態なのか、どうやって1つのツリーにするのかすぐにはわからない
* 投稿リストや友人リストを例にして考える
  * 状態（state）のなかで別々に保存したいはず
  * 別々に保持すると、キャッシュして、必要なときに再取得できる（カンバン方式？

```javascript
{
  selectedSubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true, // スピナーを表示するか=>表示=一覧表示しない
      didInvalidate: false, // データが古いと更新
      items: [] // 投稿
    },
    reactjs: {
      isFetching: false, // スピナーを表示しない=一覧表示する
      didInvalidate: false,
      lastUpdated: 1439478405547, // 最新更新
      items: [ //投稿
        {
          id: 42,
          title: 'Confusion about Flux and Relay'
        },
        {
          id: 500,
          title: 'Creating a Simple Application Using React JS and Flux Architecture'
        }
      ]
    }
  }
}
```

* subredditを別々に保持していることが読み取れる
  * 1度すべてをキャッシュ
  * ユーザーがsubredditを切り替えたときに再取得、更新すればすむ
* 実際には、fetchedPageCountやnextPageUrlといったページングの状態も保存する必要がある
* items（投稿）をネストする形で保持しているが、実際にはあまり良くない
  * ネストしたエンティティ（個別の投稿）がお互いを参照する場合
  * ユーザーが編集できる場合
  * 投稿が状態ツリー状に分散していて、結果が統一されないから
  * こういった場合は、エンティティを別に保存して、エンティティのIDを参照するようにする

```javascript
{
  selectedSubreddit: 'frontend',
  entities: {
    users: {
      2: {
        id: 2,
        name: 'Andrew'
      }
    },
    posts: {
      42: {
        id: 42,
        title: 'FluxとRelayについての混乱',
        author: 2 // 同じ著者を指している
      },
      100: {
        id: 100,
        title: 'React JSとFluxアーキテクチャを使って、シンプルなアプリケーションを作る',
        author: 2 // 同じ著者を指している
      }
    }
  },
  postsBySubreddit: {
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [ 42, 100 ] // IDを参照
    }
  }
}
```

### Async Action Creators

* 同期的なActionCreatorsをネットワークリクエストと共に使う（＝非同期）には、redux-thunkのミドルウェアを使う
* 特別なミドルウェアを使うことで、ActionCreatorsはオブジェクトの代わりに関数を返せるようになる
  * その関数はredux-thunkによって実行される
  * その関数は純粋でなくともよく、副作用が許される
  * その関数はActionをdispatchすることも可能（同期的なAction同様
