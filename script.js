let board = ['', '', '',
    '', '', '',
    '', '', ''];
const player1 = "x";
const player2 = "o";
const winningCombinations = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

const message = document.querySelector(".message");
let xturn;
const cells = document.querySelectorAll(".cell");
const restartbtn = document.querySelector(".btn");
restartbtn.addEventListener('click', reset);
start();

function start() {
    xturn = true;
    cells.forEach(cell => cell.addEventListener('click', onClick, { once: true }));
}

function onClick(e) {
    let id = e.target.dataset.index;
    if (xturn) {
        e.target.textContent = "x";
        swapTurn();
        message.textContent = "O's turn";
    } else {
        e.target.textContent = "o";
        swapTurn();
        message.textContent = "X's turn";
    }
    board[id] = e.target.textContent;
    if (checkWinner()) {
        displayResult(false);
	return;
    }
    if (isDraw()) {
        displayResult(true);
    }
}

function swapTurn() {
    xturn = !xturn;
}

function displayResult(draw) {
    if (draw) {
        message.textContent = "it's a DRAW!";
    } else {
        message.textContent = xturn ? "O's WON!" : "X's WON!";
        cells.forEach(cell => cell.removeEventListener('click', onClick));
    }
}

function isDraw() {
    return board.every(val => {
        return val != '';
    });
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player1 || combination.every(index => {
                return board[index] === player2
            })

        })
    });
}

function reset() {
    board = ['', '', '',
        '', '', '',
        '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    message.textContent = "X's turn";
    start();
}
