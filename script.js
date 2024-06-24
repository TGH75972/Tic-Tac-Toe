const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY_CELL = '';

let currentPlayer = PLAYER_X;
let gameBoard = [
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL]
];
let gameActive = true;

document.getElementById('X').addEventListener('click', () => setPlayer(PLAYER_X));
document.getElementById('O').addEventListener('click', () => setPlayer(PLAYER_O));

function setPlayer(player) {
    currentPlayer = player;
    resetGame();
}

function handleMove(row, col) {
    if (!gameActive || gameBoard[row][col] !== EMPTY_CELL) {
        return;
    }

    gameBoard[row][col] = currentPlayer;
    const cell = document.querySelector(`#game-board .row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
    if (cell) {
        cell.textContent = currentPlayer;
    }

    const winInfo = checkWin(currentPlayer);
    if (winInfo.isWin) {
        const winCells = winInfo.winningCells;
        for (let i = 0; i < winCells.length; i++) {
            winCells[i].classList.add('winning-cell');
        }
        document.getElementById('turn-message').textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        document.getElementById('turn-message').textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    document.getElementById('turn-message').textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        const [rowA, colA] = a;
        const [rowB, colB] = b;
        const [rowC, colC] = c;

        if (gameBoard[rowA][colA] === player &&
            gameBoard[rowB][colB] === player &&
            gameBoard[rowC][colC] === player) {
            return {
                isWin: true,
                winningCells: [
                    document.querySelector(`#game-board .row:nth-child(${rowA + 1}) .cell:nth-child(${colA + 1})`),
                    document.querySelector(`#game-board .row:nth-child(${rowB + 1}) .cell:nth-child(${colB + 1})`),
                    document.querySelector(`#game-board .row:nth-child(${rowC + 1}) .cell:nth-child(${colC + 1})`)
                ]
            };
        }
    }

    return { isWin: false };
}

function checkDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === EMPTY_CELL) {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    gameBoard = [
        [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL]
    ];
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });

    document.getElementById('turn-message').textContent = `Player ${currentPlayer}'s turn`;
}
