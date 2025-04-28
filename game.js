const player1 = localStorage.getItem('player1');
const player2 = localStorage.getItem('player2');
const chosenSymbol = localStorage.getItem('symbol');
let currentPlayer = player1;
let currentSymbol = chosenSymbol;
const board = document.getElementById('board');
const playerTurn = document.getElementById('playerTurn');
const resetBtn = document.getElementById('resetBtn');

playerTurn.innerText = `${currentPlayer}'s Turn (${currentSymbol})`;

function createBoard() {
  board.innerHTML = '';
  board.style.display = 'grid';
  board.style.gridTemplateColumns = 'repeat(3, 100px)';
  board.style.gridGap = '10px';
  board.style.margin = '20px auto';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.width = '100px';
    cell.style.height = '100px';
    cell.style.background = '#f0f0f0';
    cell.style.fontSize = '36px';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.cursor = 'pointer';
    cell.dataset.index = i;

    cell.addEventListener('click', makeMove);
    board.appendChild(cell);
  }
}

function makeMove(e) {
  const cell = e.target;
  if (cell.innerText !== '') return;

  cell.innerText = currentSymbol;
  if (checkWin()) {
    alert(`${currentPlayer} Wins!`);
    board.querySelectorAll('.cell').forEach(c => c.removeEventListener('click', makeMove));
    return;
  }

  if (Array.from(board.children).every(c => c.innerText !== '')) {
    alert('It\'s a Tie!');
    return;
  }

  currentPlayer = (currentPlayer === player1) ? player2 : player1;
  currentSymbol = (currentSymbol === 'X') ? 'O' : 'X';
  playerTurn.innerText = `${currentPlayer}'s Turn (${currentSymbol})`;
}

function checkWin() {
  const cells = Array.from(board.children);
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  
  return winPatterns.some(pattern => 
    pattern.every(index => 
      cells[index].innerText === currentSymbol
    )
  );
}

resetBtn.addEventListener('click', () => {
  location.reload();
});

createBoard();
