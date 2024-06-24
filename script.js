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

function handleMove(row, col) {
    if (!gameActive || gameBoard[row][col] !== EMPTY_CELL) {
        return;
    }

    gameBoard[row][col] = currentPlayer;
    const cell = document.querySelector(`#game-board .row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
    if (cell) {
        cell.textContent = currentPlayer;
    }

    if (checkWin(currentPlayer)) {
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
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] === player && gameBoard[i][1] === player && gameBoard[i][2] === player) {
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (gameBoard[0][j] === player && gameBoard[1][j] === player && gameBoard[2][j] === player) {
            return true;
        }
    }

    if ((gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][2] === player) ||
        (gameBoard[0][2] === player && gameBoard[1][1] === player && gameBoard[2][0] === player)) {
        return true;
    }

    return false;
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
    currentPlayer = PLAYER_X;
    gameBoard = [
        [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL]
    ];
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    document.getElementById('turn-message').textContent = `Player ${currentPlayer}'s turn`;
}
