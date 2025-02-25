const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart-btn');
const modeToggleButton = document.querySelector('.toggle-mode-btn');

const moveSound = document.getElementById("move-sound");
const gameOverSound = document.getElementById("game-over-sound");

let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let aiMode = true;

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const randomizeBoard = () => {
    let randomCells = Math.floor(Math.random() * 3) + 1;
    let availableCells = Array.from({ length: 9 }, (_, i) => i);
    
    for (let i = 0; i < randomCells; i++) {
        let randIndex = availableCells.splice(Math.floor(Math.random() * availableCells.length), 1)[0];
        let randValue = Math.random() < 0.5 ? 'X' : 'O';
        
        boardState[randIndex] = randValue;
        cells[randIndex].textContent = randValue;
        cells[randIndex].classList.add('pre-filled');
    }
};

const checkWin = () => {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            statusDisplay.textContent = `${currentPlayer} wins! 🎉`;
            gameOverSound.play();

            // Add winning animation
            [a, b, c].forEach(index => {
                cells[index].classList.add('winning-cell');
            });

            return true;
        }
    }
    return false;
};

const handleCellClick = (event) => {
    const index = event.target.getAttribute("data-index");

    if (boardState[index] !== "" || !gameActive || event.target.classList.contains('pre-filled')) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    moveSound.play();

    if (checkWin()) return;

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = aiMode && currentPlayer === 'O' ? "O's Turn (Computer)" : `${currentPlayer}'s Turn (Player 2)`;

    if (aiMode && currentPlayer === 'O') setTimeout(botMove, 500);
};

const botMove = () => {
    let availableCells = boardState.map((val, i) => val === "" ? i : null).filter(i => i !== null);
    let move = availableCells[Math.floor(Math.random() * availableCells.length)];
    cells[move].click();
};

// Reset the board without the winning animation lingering
const restartGame = () => {
    boardState.fill("");
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = "X's Turn (You)";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("pre-filled", "winning-cell"); // Remove animations and colors
    });
    randomizeBoard();
};

randomizeBoard();
restartButton.addEventListener("click", restartGame);
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
