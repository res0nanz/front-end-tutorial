import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      // buttonのonClickで実行されるモノ
      // =BoardからonClickとして渡されたモノ
      // =props.onClick =BoardのhandleClick
      // 各SquareがBoardのhandleClickを参照
      onClick={props.onClick}
    >
      { this.props.value }
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  handleClick(i) {
    // copyを作り、copyを変更。setStateにて反映
    // this.state.squaresを直接変更しないで済む
    // this.stateもイミュータブル扱いにできる（しなくてはいけない）
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    // 反映
    this.setState({ squares: squares });
    // setStateでないとre-renderされない
    // ESLint Warningが出る
    // this.state.squares[i] = 'X';
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

