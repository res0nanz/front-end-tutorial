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
