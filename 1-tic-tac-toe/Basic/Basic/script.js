const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.querySelector('.restart-btn');
const statusDisplay = document.querySelector('.status');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const checkWinner = () => {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      gameActive = false;
      statusDisplay.textContent = `${currentPlayer} Wins!`;
      return;
    }
  }

  if (!boardState.includes('')) {
    gameActive = false;
    statusDisplay.textContent = "It's a Tie!";
  }
};

const handleCellClick = (index) => {
  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `${currentPlayer}'s Turn`;
  }
};

const restartGame = () => {
  gameActive = true;
  currentPlayer = 'X';
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  statusDisplay.textContent = `${currentPlayer}'s Turn`;
};

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

restartButton.addEventListener('click', restartGame);

statusDisplay.textContent = `${currentPlayer}'s Turn`;
