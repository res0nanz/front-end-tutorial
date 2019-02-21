# styled-components Advanced Tutorial

## Theming

* `<ThemeProvider>`でラップしたらラップされたcomponentsのpropsに`<ThemeProvider>`の引数を渡す
* `<ThemeProvider theme={main: "red"}>`であれば、`props.theme.main`
* `<ThemeProvider>`でラップするのは単一components

### Function themes

* `<ThemeProvider theme={function}>`のように関数を渡すこともできる
* 渡された関数の処理をした上で、スタイリングを行う

### Error

* `React.Children.only expected to receive a single React element child.`
