# styled-components

## Getting Started

* `npm install --save styled-components`
* styled-componentsはcomponentsとstylesの紐付けを解消する
* styled-componentsでstylesを宣言すると、自動的にReactComponentsを作成する
  * 他のReactComponents同様、囲むだけ
  * vendor-prefixedも気にする必要がない
* `styled.section`のように書くため、HTMLタグづけもこれ1つですむ

```javascript
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

render(
  <Wrapper>
    Hello World!
  </Wrapper>
);
```

## Adapting based on props

* Propsを受け取ることもできる
* 例）`background: ${props => props.primary ? "white" : "black"}`
* 使用する時に`<Button primary>`と渡せばよい

## Extending Styles

* 自作したのstyled-componentsを拡張して使う
* `styled()`にcomponentsを引数として渡すだけ