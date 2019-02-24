# styled-components Advanced Tutorial

## Theming

* `<ThemeProvider>`でラップしたらラップされたcomponentsのpropsに`<ThemeProvider>`の引数を渡す
* `<ThemeProvider theme={main: "red"}>`であれば、`props.theme.main`
* `<ThemeProvider>`でラップするのは単一components
* ラップ内全体にprops.theme.xxxを渡すことができる=まとめてスタイリングができる

### Function themes

* `<ThemeProvider theme={function}>`のように関数を渡すこともできる
* 渡された関数の処理をした上で、スタイリングを行う

### Error

* `React.Children.only expected to receive a single React element child.`
* JSX内に`{ /* コメント */ }`を書いた。書き方が原因
* `<JSX CODE> { /* commnet */ }`はNG
* コメントは別途、1行に書く

```html
// ダメな例
<JSX CODE> { /* commnet */ }
// 正しい例
{ /* commnet */ }
<JSX CODE>
```

### Getting the theme without styled components

* componentの外にまでthemeを渡したい
* `withTheme`を使う
* `export default withTheme(App);`のように

## Refs

* styled-componentsVer4, ReactVer16
* 以下の2つのうち1つを提供する
  * 基礎となるDOMノード
  * React components インスタンス
* refsはReactのライフサイクルを無視して直接DOMを操作する

```javascript
<Input
  ref={this.inputRef}
  placeholder="Hover to focus!"
  onMouseEnter={() => { // マウスホバーしたら
      this.inputRef.current.focus()
  }}
/>
```

* `this.inputRef`は`<Input>`のcontructorでref変数として宣言
* `ref={this.inputRef}`より、この`<Input>`にref変数を与える
* `this.inputRef.current.focus()`より、`this.inputRef`をfocus
* `this.inputRefをfocus` == `この<Input>のrefをfocus`
* `この<Input>`をfocus
* `ref={this.inputRef}`をなくすと、`null.focus()`になる

## Security

* CSS Injectionに気をつける
* CSSをJavaScriptから守るCSS.escapeが決まりつつある
* polyfill by Mathias Bynens を使うと良い

## Existing CSS

* 既存のCSSとstyled-componentsを使用するときの注意
  * classNameを適用: `<div className={this.props.className} />`
  * classNameを結合: `<div className={`some-global-class ${this.props.className}`} />`
  * componentsのstyleが優先
  * サードパーティ製スタイルスクリプト

```javascript
// .js
const MyComponent = styled.div`background-color: green;`;
// .css
.red-bg {
  background-color: red;
}
// greenのまま
<MyComponent className="red-bg" />

// 解決策
.red-bg.red-bg {
  background-color: red;
}
```

## Media Templates

* メディアクエリをテンプレ化
* 使い回すことができる

```javascript
const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

const Content = styled.div`
  height: 3em;
  width: 3em;
  background: papayawhip;

  /* Now we have our methods on media and can use them instead of raw queries */
  ${media.desktop`background: dodgerblue;`}
  ${media.tablet`background: mediumseagreen;`}
  ${media.phone`background: palevioletred;`}
`;

render(
  <Content />
);
```

## Tagged Template Literals

* ES6で追加された新機能
* styled-componentsが機能する立役者

```javascript
// 同じ
fn`some string here`
fn(['some string here'])
```

```javascript
const aVar = 'good'
// 同じ
fn`this is a ${aVar} day`
fn(['this is a ', ' day'], aVar) // splitされたもののあとに補間がくる
```
