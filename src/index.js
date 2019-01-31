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
      { props.value }
    </button>
  );
}

// renderとrenderSquareに専念することができた
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        // props -> squaresをGameから受け取る
        value={this.props.squares[i]}
        // 親のGameがhandleClickを持つため、変更
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  // Board -> Game より高層へ
  constructor(props) {
    super(props);
    this.state = {
      // 過去の操作をすべて記憶する
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  // Boardより移動
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    // copyを作り、copyを変更。setStateにて反映
    // squaresを直接変更しないで済む
    const squares = current.squares.slice();
    // すでにマスが埋まっているor勝敗が決まっているか
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] =  this.state.xIsNext ? 'X': 'O';
    // 反映
    this.setState({
      // pushを使わずconcat（連結）を使う
      // pushは破壊的。historyの参照先まで変わってしまう
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
    // setStateでないとre-renderされない
    // ESLint Warningが出る
    // this.state.squares[i] = 'X';
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    // histroyからstepとmoveに分け、処理
    const moves = history.map((step, move) => {
      // moveから文を生成
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        // ボタン。Arrayからlistをつくる=>keyが必要
        // keyにArrayのindexを使うことはオススメしない。変更、削除等がしにくいため（しなければ使っても良い）
        // keyはグローバルにユニークである必要はない。componet内と兄弟関係にあるcomponetsでユニーク
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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

function calculateWinner(squares) {
  // 勝利パターン
  const lines = [
   // 横
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // 縦
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // 斜め
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // パターンが同じマークで埋まっているか=勝利が決まっているか
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
      }
  }
  return null;
}
