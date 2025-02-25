const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart-btn');
const modeToggleButton = document.querySelector('.toggle-mode-btn');

const moveSound = document.getElementById("move-sound");
const gameOverSound = document.getElementById("game-over-sound");

let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let aiMode = true; // True for AI Mode, False for 2P Mode

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const checkMisereLoss = () => {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] === currentPlayer && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            statusDisplay.textContent = `${currentPlayer} loses!`;
            pattern.forEach(index => cells[index].classList.add("flash"));
            gameOverSound.play();
            return true;
        }
    }
    return false;
};

const handleCellClick = (event) => {
    const index = event.target.getAttribute("data-index");

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    moveSound.play();

    if (checkMisereLoss()) return;

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = aiMode && currentPlayer === 'O' ? "O's Turn (Computer)" : `${currentPlayer}'s Turn (Player 2)`;

    if (aiMode && currentPlayer === 'O') setTimeout(botMove, 500);
};

const botMove = () => {
    let availableCells = boardState.map((val, i) => val === "" ? i : null).filter(i => i !== null);
    let move = availableCells[Math.floor(Math.random() * availableCells.length)];
    cells[move].click();
};

const restartGame = () => {
    boardState.fill("");
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = "X's Turn (You)";
    cells.forEach(cell => { cell.textContent = ""; cell.classList.remove("flash"); });
};

modeToggleButton.addEventListener("click", () => {
    aiMode = !aiMode;
    modeToggleButton.textContent = aiMode ? "Game Mode: AI" : "Game Mode: 2P";
    restartGame();
});

restartButton.addEventListener("click", restartGame);
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
