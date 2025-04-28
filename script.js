document.getElementById('startBtn').addEventListener('click', () => {
    const player1 = document.getElementById('player1').value.trim();
    const player2 = document.getElementById('player2').value.trim();
    const symbol = document.querySelector('input[name="symbol"]:checked').value;
  
    if (player1 && player2) {
      // Save data to local storage to pass to game page
      localStorage.setItem('player1', player1);
      localStorage.setItem('player2', player2);
      localStorage.setItem('symbol', symbol);
  
      window.location.href = 'game.html';
    } else {
      alert('Please enter names for both players!');
    }
  });
  