let currentPlayer = 'X'; // Starting player
let gameBoard = [
    [[], [], []], // Level 1
    [[], [], []], // Level 2
    [[], [], []]  // Level 3
];
const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turnDisplay');
const hintBtn = document.getElementById('hintBtn');
const clearBtn = document.getElementById('clearBtn');
const resetBtn = document.getElementById('resetBtn');

// Event listener for each cell click
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const [level, row, col] = cell.dataset.pos.split(',').map(Number);

        if (!gameBoard[level - 1][row - 1][col - 1]) {
            gameBoard[level - 1][row - 1][col - 1] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            
            if (checkWinner()) {
                alert(`${currentPlayer} wins!`);
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
                turnDisplay.textContent = `Current turn: ${currentPlayer}`;
            }
        }
    });
});

// Function to check all winning combinations
function checkWinner() {
    // Check rows, columns, and diagonals for each level
    for (let level = 0; level < 3; level++) {
        // Check rows and columns within levels
        for (let i = 0; i < 3; i++) {
            if (gameBoard[level][i][0] && 
                gameBoard[level][i][0] === gameBoard[level][i][1] && 
                gameBoard[level][i][1] === gameBoard[level][i][2]) {
                return true;
            }
            if (gameBoard[level][0][i] && 
                gameBoard[level][0][i] === gameBoard[level][1][i] && 
                gameBoard[level][1][i] === gameBoard[level][2][i]) {
                return true;
            }
        }
    }

    // Check 3D diagonals
    if (check3DDiagonals()) return true;

    return false;
}

function check3DDiagonals() {
    // Add logic for checking 3D diagonals
    return false;
}

// Reset game state
function resetGame() {
    gameBoard = [
        [[], [], []],
        [[], [], []],
        [[], [], []]
    ];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    turnDisplay.textContent = `Current turn: X`;
}

// Clear the board
clearBtn.addEventListener('click', resetGame);

// Hint button: simple hint showing the first available empty cell
hintBtn.addEventListener('click', () => {
    const emptyCells = [];
    gameBoard.forEach((level, lIndex) => {
        level.forEach((row, rIndex) => {
            row.forEach((cell, cIndex) => {
                if (!cell) emptyCells.push([lIndex, rIndex, cIndex]);
            });
        });
    });

    // If there are empty cells, suggest one by highlighting it
    if (emptyCells.length) {
        const [level, row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = document.querySelector(`[data-pos="${level + 1},${row + 1},${col + 1}"]`);
        cell.classList.add('hint');
        setTimeout(() => {
            cell.classList.remove('hint');
        }, 1000);
    }
    alert('Hint feature will highlight an empty cell!');
});
