const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid; //check status of boxes
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//let's create a function to initialise the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //UI par bhi empty karna padega boxes ko
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents="all";
    //one more thing is missing,initilise box with css proprties again
    box.classList=`box box${index+1}`;


  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player-${currentPlayer}`;
}
initGame();
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }
  //UI Update
  gameInfo.innerText = `Current Player-${currentPlayer}`;
}
function checkGameOver() {
  //TODO
  let answer="";
  winningPositions.forEach((position)=>{
    //all 3 boxes should be nonempty and exactly same in the value
 if(((gameGrid[position[0]]!=="")&&(gameGrid[position[1]]!=="")&&(gameGrid[position[2]]!=="")) && 
    (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){
      
         //check if winner ixs x
         if(gameGrid[position[0]]==="X"){
            answer="X";
         }
         else{
            answer="0";
         }
         //winner mil chuka hai to pointerEvents none kardo
         //disable all pointervvenets
         boxes.forEach((box)=>{
            box.style.pointerEvents="none";
         })
        
        //bgc green banana
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

    }
  });

  //if we have a winner
  if(answer!==""){
    gameInfo.innerText=`Winner Player-${answer}`;
    newGameBtn.classList.add("active");
    return;//winner milne ke baad return
  }

  //let's check whether there is tie
  //ya to winner milegAa ya game is going on or tie hai
  let fillCount=0;
  gameGrid.forEach((box)=>{
    if(box!==""){
        fillCount++;
    }
  })
  //fillCount 9 means board is filled and game is tie
  if(fillCount===9){
    gameInfo.innerText=`Game Tied !`;
    newGameBtn.classList.add("active");
  }

}
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap karo turn ko
    swapTurn();
    //chevck koi jeet to nhi gya
    checkGameOver();
  }
}
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});
newGameBtn.addEventListener("click", initGame);
