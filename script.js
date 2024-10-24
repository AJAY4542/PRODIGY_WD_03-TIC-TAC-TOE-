const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.querySelector('.status-message');
const restartBtn = document.getElementById('restartBtn');
let isXTurn = true;
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations for the Tic-Tac-Toe board
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Start game - Listen for cell clicks
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

// Handle cell click
function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    
    if (!gameActive || board[cellIndex] !== '') {
        resetGame(); // Auto-reset on click after win
        return;
    }

    const currentClass = isXTurn ? 'X' : 'O';
    
    // Place marker and update the board
    cell.textContent = currentClass;
    board[cellIndex] = currentClass;
    
    // Check for win or draw
    if (checkWin(currentClass)) {
        statusMessage.textContent = `Player ${currentClass} Wins! Click anywhere to play again.`;
        gameActive = false;
    } else if (isDraw()) {
        statusMessage.textContent = 'It\'s a Draw! Click anywhere to play again.';
        gameActive = false;
    } else {
        // Switch turns
        isXTurn = !isXTurn;
        statusMessage.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
    }
}

// Check for win
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return board[index] === currentClass;
        });
    });
}

// Check for draw
function isDraw() {
    return board.every(cell => cell !== '');
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isXTurn = true;
    gameActive = true;
    statusMessage.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Restart button functionality
restartBtn.addEventListener('click', resetGame);
