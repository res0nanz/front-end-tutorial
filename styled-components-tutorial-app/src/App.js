import React, { Component } from 'react';
import styled from 'styled-components';
import SelectorPatterns from './SelectorPatterns';
import Other from './Other';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Button = styled.button`
  /* propsとして渡されたprimaryがtureか（primaryがあるか）*/
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = styled(Button) `
  color: tomato;
  border-color: tomato;
`;

// 渡された文字列を逆から表示
const ReversedButton = props => <button {...props} children={props.children.split('').reverse()}/>

// .classを付与する
const Link = ({ className, children }) => (
  <a className={className} href="/">
    {children}
  </a>
);

// 上で付与する.classのstyles
const StyledLink = styled(Link) `
  color: palevioletred;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const StyledCounter = styled.div`
  /* ... */
`
const Paragraph = styled.p`
  /* ... */
`

class App extends Component {
  state = { count: 0 }

  increment = () => this.setState({ count: this.state.count + 1 })
  decrement = () => this.setState({ count: this.state.count - 1 })

  render() {
    return (
      <div className="App">
        <Wrapper>
          <Title>Hello World!</Title>
        </Wrapper>
        <Button>Normal Button</Button>
        <Button primary>Primay Button</Button>
        <TomatoButton>Tomato Button</TomatoButton>
        <Button as="a" href="/">Link Button</Button>
        <Button as={ReversedButton}>Custom Button with Normal Button styles</Button>
        <br />
        <Link>Unstyled, boring Link</Link>
        <br />
        <StyledLink>Styled, exciting Link</StyledLink>
        <br />
        <Input defaultValue="@probablyup" type="text" />
        <Input defaultValue="@geelen" type="text" inputColor="rebeccapurple" />
        <br />
        <StyledCounter>
          <Paragraph>{this.state.count}</Paragraph>
          <Button onClick={this.increment}>+</Button>
          <Button onClick={this.decrement}>-</Button>
        </StyledCounter>
        <SelectorPatterns />
        <Other />
      </div>
    );
  }
}

export default App;
