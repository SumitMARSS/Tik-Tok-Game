const player = document.querySelector(".player-info");
const boxes = document.querySelectorAll(".box");
const newBtn = document.querySelector(".btn");
const wholeGridBox = document.querySelector(".tix-tok-grid");


let GameGrid ;
let currPlayer;

const winner = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initGame();
function initGame(){
    console.log("enetered in init after click");
    currPlayer = "X";
    GameGrid = ["", "", "","", "", "","", "", ""];
    //we didn't updated on UI
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //disabling the green color
        box.classList = `box box${index+1}`;
    });
    // disabling player winner
    player.classList = `player-info`;
    newBtn.classList.remove("active");
    player.innerText = `Current Player - ${currPlayer}`;
}

function swap_curr_player(){
    if(currPlayer === "X"){
        currPlayer = "O";
    }
    else{
        currPlayer = "X";
    }
};

function check_for_win(){
    let answer = "";
    winner.forEach((positon) => {
        if(( GameGrid[positon[0]] != "" && GameGrid[positon[1]] != ""  && GameGrid[positon[2]] != "")  && 
        ( GameGrid[positon[0]] === GameGrid[positon[1]] ) && ( GameGrid[positon[1]] === GameGrid[positon[2]] ) ){
            //here we don;t know who is winner
            if(GameGrid[positon[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }
            //if position has answer then mark then win
            boxes[positon[0]].classList.add("win");
            boxes[positon[1]].classList.add("win");
            boxes[positon[2]].classList.add("win");
        }
        //if we reach here and answer is filled means nothing must be clickable
        if(answer != ""){
            newBtn.classList.add("active");
            //disable further click
            boxes.forEach((box,index) => {
                box.style.pointerEvents = "none";
            });
            player.innerText = `Winner - ${answer}`;
            player.classList.add("winner");
        }
        //here we reach means answer is empty may be half filled or totally filled
        //check for tie
        if(answer == ""){
            let cnt = 0;
            GameGrid.forEach((element) => {
                if(element != ""){
                    cnt = cnt+1;
                }
            });
            if(cnt == 9){
                player.innerText = "Tied !";
                player.classList.add("winner");
                newBtn.classList.add("active");
            }
        }
    });
}

function handle_click(index){
    if(GameGrid[index] == ""){
        GameGrid[index] = currPlayer;
        //make apperance in UI the value of curr player
        boxes[index].innerText = currPlayer;
        //make not to have currsor on filled part
        boxes[index].style.pointerEvents = "none";
        //swap the turn of player
        swap_curr_player();
        //update in head UI also
        player.innerText = `Current Player - ${currPlayer}`;
        //check if anyone gets winn
        check_for_win();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handle_click(index);
    });
});

newBtn.addEventListener("click", initGame);