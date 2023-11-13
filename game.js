
let board = ["", "", "", "", "", "", "", "", ""]; 
let playerTurn = 0; 
let symbols = ["o", "x"]; 
let gameOver = false; 


let winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


document.addEventListener("DOMContentLoaded", () => {
 
  let squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("click", handleClick);
  });

  
  let restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", () => {
    
    board = ["", "", "", "", "", "", "", "", ""];
    playerTurn = 0;
    gameOver = false;

   
    squares.forEach((square) => {
      square.innerHTML = "";
    });
  });
});


function handleClick(event) {
  let square = event.target;
  let position = square.id;

  
  if (handleMove(position)) {
    setTimeout(() => {
      
      alert("Fim da partida! - O jogador " + playerTurn + " foi o vencedor!");
    }, 10);
  }
 
  updateSquare(square, position);
}


function updateSquare(square, position) {
  let symbol = board[position];
  if (symbol !== "") {
    square.innerHTML = `<div class="${symbol}"></div>`;
  }
}


function handleMove(position) {
 
  if (gameOver) {
    return;
  }
  
  if (board[position] == "") {

    board[position] = symbols[playerTurn];

    
    gameOver = isWin();

    
    if (gameOver == false) {
      playerTurn = playerTurn == 0 ? 1 : 0;
    }
  }

  return gameOver;
}


function isWin() {
  for (let i = 0; i < winStates.length; i++) {
    let seq = winStates[i];

    let pos1 = seq[0];
    let pos2 = seq[1];
    let pos3 = seq[2];

    if (
      board[pos1] == board[pos2] &&
      board[pos1] == board[pos3] &&
      board[pos1] != ""
    ) {
      return true;
    }
  }

  return false;
}
