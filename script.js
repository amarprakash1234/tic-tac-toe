let turn = "O";

let total_turn = 0;

let winner = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

let board_array = new Array(9).fill("E"); // nine size ka array jisme initially sare element ki value E(empty) hai.

function checkWinner() {
    for(let [idx0, idx1, idx2] of winner) {
        if(board_array[idx0]!="E" && board_array[idx0]===board_array[idx1] && board_array[idx1] === board_array[idx2]) {
            return true;
        }
    }
    return false;
}

const printer = (event) => {
    const element = event.target;
    if(board_array[element.id] === "E") {
        total_turn++;
        if(turn === "O") {
            element.innerHTML = "O";
            board_array[element.id] = "O";
            if(checkWinner()) {
                let para = document.getElementById("winningMessage");
                para.innerHTML = "Winner is O";
                board.removeEventListener("click", printer);
                return;
            }
            turn = "X";
        } else {
            element.innerHTML = "X";
            board_array[element.id] = "X";
            if(checkWinner()) {
                let para = document.getElementById("winningMessage");
                para.innerHTML = "Winner is X";
                board.removeEventListener("click", printer);
                return;
            }
            turn = "O";
        }
    }

    if(total_turn === 9) {
        let para = document.getElementById("winningMessage");
        para.innerHTML = "Match is Draw";
        board.removeEventListener("click", printer); // esko na likho fir v farak nhi praga.
    }
}

const board = document.querySelector(".board")
board.addEventListener("click", printer);

const restart = document.querySelector("#restartButton");
restart.addEventListener("click", (event) => {
    const cells = document.querySelectorAll(".cell");
    Array.from(cells).forEach((cell) => {
        cell.innerHTML = "";
    });
    let para = document.getElementById("winningMessage");
    para.innerHTML = "";
    turn = "O";
    total_turn = 0;
    board_array = new Array(9).fill("E"); 
    board.addEventListener("click", printer);
});