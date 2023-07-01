import React, { Component } from 'react';

class TicTacToe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(null),
            currentPlayer: 'X',
            winner: null,
        };
    }

    handleCellClick(index) {
        const { board, currentPlayer, winner } = this.state;
        if (!board[index] && !winner) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;

            this.setState(
                {
                    board: newBoard,
                    currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
                },
                () => {
                    this.checkWinner();
                }
            );
        }
    }

    checkWinner() {
        const { board } = this.state;
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                this.setState({ winner: board[a] });
                break;
            }
        }

        if (!board.includes(null) && !this.state.winner) {
            this.setState({ winner: 'Draw' });
        }
    }

    resetGame() {
        this.setState({
            board: Array(9).fill(null),
            currentPlayer: 'X',
            winner: null,
        });
    }

    render() {
        const { board, currentPlayer, winner } = this.state;

        return (
            <div>
                <h1>Tic Tac Toe</h1>
                <div className="board">
                    {board.map((cell, index) => (
                        <div
                            key={index}
                            className="cell"
                            onClick={() => this.handleCellClick(index)}
                        >
                            {cell}
                        </div>
                    ))}
                </div>
                <p>Current Player: {currentPlayer}</p>
                {winner && (
                    <div>
                        <p>Winner: {winner}</p>
                        <button onClick={() => this.resetGame()}>Reset</button>
                    </div>
                )}
            </div>
        );
    }
}

export default TicTacToe;
