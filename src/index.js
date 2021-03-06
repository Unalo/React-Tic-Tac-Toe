import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     value: null
//   //   }
//   // }
//     render() {
//       return (
//         <button className="square" 
//         onClick= {() => this.props.onClick() }
//           >
//           {this.props.value}
//         </button>
//       );
//     }
//   }

// function companent with render method only, doesn't have own state 
  function Square (props) {
    return (
      // onclick event will call click event from renderSquare
      <button className="square" onClick = {props.onClick}>
        {props.value}
      </button>
    );
  }
  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.input = React.createRef();
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.input.current.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" ref={this.input} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  
  ReactDOM.render(
    <NameForm />,
    document.getElementById('root2')
  );

  
  // Board state is in control of square/insync with each other
  class Board extends React.Component {
    // setting state (private)
    constructor(props) {
      super(props);
      this.state = {
        squares : Array(9).fill(null),
        // setting first move 
        xIsNext: true,
      };
    }
    // handle clicks
    handleClick (i) {
      // creating a copy of squares to modify, avoiding modifying the existing Array 
      // to Achieve immutability
      const squares = this.state.squares.slice();
      // updating xIsNext to take turns
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares : squares,
        xIsNext: !this.state.xIsNext,
      });
    }

    renderSquare(i) {
      return ( 
      <Square 
      value = { this.state.squares[i] }
      onClick = { () => this.handleClick(i) }
      />
      );
    }
  
    render() {
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

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
  // getting winner 
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  } 