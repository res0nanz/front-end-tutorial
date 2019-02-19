import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const Input2 = styled.input.attrs(({ size }) => ({
  // 静的props:変更不可
  type: "password",

  // 動的props
  margin: size || "1em",
  padding: size || "1em"
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* 動的にmargin, paddingを決める */
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

// 回転アニメーション
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

class Other extends Component {
  render () {
    return (
      <div>
        <Input2 placeholder="A small text input" size="1em" />
        <br />
        <Input2 placeholder="A bigger text input" size="2em" />
        <br />
        <Rotate>A</Rotate>
      </div >
    );
  }
}

export default Other;
