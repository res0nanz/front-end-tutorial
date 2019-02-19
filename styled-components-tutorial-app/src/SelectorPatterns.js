import React, { Component } from 'react';
import styled, {createGlobalStyle} from 'styled-components';

const Thing = styled.div.attrs({ tabIndex: 0 }) `
  color: blue;

  &:hover {
    color: red; // <Thing>すべてに共通する
  }

  & ~ & {
    background: tomato; // 2番目以降の<Thing>
  }

  & + & {
    background: lime; // 2番目の<Thing>
  }

  &.something {
    background: orange; // .somethingがつけられた<Thing>
  }

  .something-else & {
    border: 1px solid; // .something-elseがつけらたもの直下の<Thing>
  }
`;

const Thing2 = styled.div`
  color: blue;

  .something {
    border: 1px solid; // <Thing>以下の.somethingがついたものを対象とする
    display: block;
  }
`;

const Thing3 = styled.div`
  && {
    color: blue;
  }
`;

const GlobalStyle = createGlobalStyle`
  div${Thing3} {
    color: red;
  }
`;

class SelectorPatterns extends Component {
  render() {
    return (
      <div className="SelectorPatterns">
        <Thing>Hello world!</Thing>
        <Thing>How ya doing?</Thing>
        <Thing className="something">The sun is shining...</Thing>
        <div>Pretty nice day today.</div>
        <Thing>Don't you think?</Thing>
        <div className="something-else">
          <Thing>Splendid.</Thing>
        </div>
        <Thing2>
          <label htmlFor="foo-button" className="something">Mystery button</label>
          <button id="foo-button">What do I do?</button>
        </Thing2>
        <br />
        <GlobalStyle />
        <Thing3>
          I'm blue, da ba dee da ba daa
        </Thing3>
      </div>
    );
  }
}

export default SelectorPatterns;