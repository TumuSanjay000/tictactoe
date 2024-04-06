let new_currentPlayer = 'X';
let new_gameBoard = ['', '', '', '', '', '', '', '', ''];
let new_gameActive = true;
function handleNewPlayerTurn(clickedCellIndex) {
    if (new_gameBoard[clickedCellIndex] !== '' || !new_gameActive) {
        return;
    }
    new_gameBoard[clickedCellIndex] = new_currentPlayer;
    checkForNewWinOrDraw();
    new_currentPlayer = new_currentPlayer === 'X' ? 'O' : 'X';
    updateNewUI();
}
const new_cells = document.querySelectorAll('.new_cell');
new_cells.forEach(cell => {
    cell.addEventListener('click', new_cellClicked, false);
});
function new_cellClicked(clickedCellEvent) {
    const new_clickedCell = clickedCellEvent.target;
    const new_clickedCellIndex = parseInt(new_clickedCell.id.replace('new_cell-', '')) - 1;
    if (new_gameBoard[new_clickedCellIndex] !== '' || !new_gameActive) {
        return;
    }
    handleNewPlayerTurn(new_clickedCellIndex);
}
function updateNewUI() {
    for (let i = 0; i < new_cells.length; i++) {
        new_cells[i].innerText = new_gameBoard[i];
    }
}
const new_winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function checkForNewWinOrDraw() {
    let roundWon = false;
    for (let i = 0; i < new_winConditions.length; i++) {
        const [a, b, c] = new_winConditions[i];
        if (new_gameBoard[a] && new_gameBoard[a] === new_gameBoard[b] && new_gameBoard[a] === new_gameBoard[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        announceNewWinner(new_currentPlayer);
        new_gameActive = false;
        return;
    }
    let roundDraw = !new_gameBoard.includes('');
    if (roundDraw) {
        announceNewDraw();
        new_gameActive = false;
        return;
    }
}
function announceNewWinner(player) {
    const new_messageElement = document.getElementById('new_gameMessage');
    new_messageElement.innerText = `Player ${player} Wins!`;
}
function announceNewDraw() {
    const new_messageElement = document.getElementById('new_gameMessage');
    new_messageElement.innerText = 'Game Draw!';
}
function resetNewGame() {
    new_gameBoard = ['', '', '', '', '', '', '', '', ''];
    new_gameActive = true;
    new_currentPlayer = 'X';
    new_cells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('new_gameMessage').innerText = '';
}
const new_resetButton = document.getElementById('new_resetButton');
new_resetButton.addEventListener('click', resetNewGame, false);