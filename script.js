let table = document.getElementById("board");
let sudokuBoard = [];

function createSudokuBoard() {
    table.innerHTML = "";
    for (let row=0; row<9; row++){
        let tr = document.createElement("tr");

        for (let col=0; col<9; col++){
            let td = document.createElement("td");
            td.classList.add("tile");

            if (sudokuBoard[row][col] === 0) {
                td.textContent = "";
            } else {
                td.textContent = sudokuBoard[row][col];
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function isValid(sudokuBoard, row, col, num){
    for (let i=0; i<9; i++){
        if(sudokuBoard[row][i] === num){
            return false;
        } 
    }

    for (let i=0; i<9; i++){
        if(sudokuBoard[i][col] === num){
            return false;
        } 
    }

    startRow = Math.floor(row/3)*3;
    startCol = Math.floor(col/3)*3;

    for (let i=0; i<3; i++){
        for (let j=0; j<3; j++) {
            if (sudokuBoard[startRow + i][startCol + j] === num){
                return false;
            } 
        }
    }

    return true;
}

function solveSudoku(sudokuBoard) {
    for (let row=0; row<9; row++) {
        for (let col=0; col<9; col++) {
            if (sudokuBoard[row][col] === 0) {
                for (let num=1; num<=9; num++) {
                    if (isValid(sudokuBoard, row, col, num)){
                        sudokuBoard[row][col] = num;

                        if(solveSudoku(sudokuBoard)) {
                            return true;
                        }

                        sudokuBoard[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}


function generateSudoku() {
    for (let i=0; i<9; i++) {
        sudokuBoard[i] =new Array(9).fill(0);
    }

    for (let i=0; i<9; i++) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        let num = Math.floor(Math.random() * 9) + 1;

        if (isValid(sudokuBoard, row, col, num)) {
            sudokuBoard[row][col] = num;
        }
    }

   
    solveSudoku(sudokuBoard);

    createSudokuBoard();
    
    
}
