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
    const COLUMNS_PER_ROW = 3
    const render_items = []
    for (let i = 0; i < COLUMNS_PER_ROW; i++) {
      const render_squares = [];
      for (let j = 0; j < COLUMNS_PER_ROW; j++) {
        render_squares.push(
          this.renderSquare(COLUMNS_PER_ROW*i+j)
        )
      }
      render_items.push(
        <div className="board-row">
          {render_squares}
        </div>
      )
    }
    return (
      <div>
        {render_items}
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
        // 追加課題1
        location: [],
      }],
      // ターン数
      stepNumber: 0,
      // ターンにプレイヤーはXか（Oでないか）
      xIsNext: true,
    };
  }

  // Boardより移動
  handleClick(i) {
    // 上限を定めることで、未来のhistoryというバグを起こさない
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // copyを作り、copyを変更。setStateにて反映
    // squaresを直接変更しないで済む
    const squares = current.squares.slice();
    // すでにマスが埋まっているor勝敗が決まっているか
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    // マスを埋める
    squares[i] =  this.state.xIsNext ? 'X': 'O';
    // 反映
    this.setState({
      // pushを使わずconcat（連結）を使う
      // pushは破壊的。historyの参照先まで変わってしまう
      history: history.concat([{
        squares: squares,
        // y（整数）, x
        location: [i / 3 | 0, i % 3],
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    // setStateでないとre-renderされない
    // ESLint Warningが出る
    // this.state.squares[i] = 'X';
  }

  jumpTo(step) {
    this.setState({
      // 遡る
      stepNumber: step,
      // stepからターンを計算しなおす
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // histroyから処理 -> movesとして所持
    // mapメソッドの引数=要素,インデックス,配列オブジェクト
    const moves = history.map((step, move) => {
      // moveから文を生成
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      // step.locationから文を生成
      const location = step.location
      const location_sentence = location.length > 0 ? `Y:${location[0]}, X:${location[1]}` : '';
      return (
        // ボタン。Arrayからlistをつくる=>keyが必要
        // keyにArrayのindexを使うことはオススメしない。変更、削除等がしにくいため（しなければ使っても良い）
        // keyはグローバルにユニークである必要はない。componet内と兄弟関係にあるcomponetsでユニーク
        // オプション課題2
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {current === step ? <b>{desc}</b> : desc}
          </button>
          <p>{location_sentence}</p>
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
