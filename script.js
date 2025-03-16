let table = document.getElementById("board");
let digitsContainer = document.getElementById("digits");
let sudokuBoard = [];
let solvedSudoku = [];
let selectedCell = null;
let errorCount = 0;

function createSudokuBoard() {
    table.innerHTML = "";
    for (let row=0; row<9; row++){
        let tr = document.createElement("tr");

        for (let col=0; col<9; col++){
            let td = document.createElement("td");
            td.classList.add("tile");

            if (sudokuBoard[row][col] === 0) {
                td.textContent = "";
                td.classList.add("editable");
                td.addEventListener("click", function () {
                    selectCell(td, row, col);
                });
            } else {
                td.textContent = sudokuBoard[row][col];
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function createDigits() {
    digitsContainer.innerHTML = "";

    for(let num=1; num<=9; num++){
        let digit = document.createElement("div");
        digit.textContent = num;
        digit.classList.add("digit");

        digit.addEventListener("click", function() {
            placeNumber(num);
        });

        digitsContainer.appendChild(digit);
    }
}

function selectCell(td, row, col) {
    if (selectedCell) {
        selectedCell.classList.remove("selected");
    }

    selectedCell = td;
    selectedCell.classList.add("selected");
    selectedCell.dataset.row = row;
    selectedCell.dataset.col = col;
}

function placeNumber(num) {
    if (selectedCell) {
        let row = selectedCell.dataset.row;
        let col = selectedCell.dataset.col;

        if (solvedSudoku[row][col] === num) {
            sudokuBoard[row][col] = num;
            selectedCell.textContent = num;
            selectedCell.style.color = 'green';

        } else {
            sudokuBoard[row][col] = num;
            selectedCell.textContent = num;
            selectedCell.style.color = 'red';

            incrementErrors();
        }

        selectedCell.classList.remove("selected");
        selectedCell = null;

        if (isSudokuComplete()) {
            alert("Congratulations! You have solved the Sudoku!")
        }

    }
}
function isSudokuComplete() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudokuBoard[row][col] !== solvedSudoku[row][col]) {
                return false;
            }
        }
    }
    return true;
}

function incrementErrors() {
    errorCount++;

    let errorDisplay = document.getElementById("errors");
    if(errorDisplay) {
        errorDisplay.textContent = `Errors: ${errorCount}`;
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

function removeNumbers(count) {
    let numErased = 0;

    while (numErased < count) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if (sudokuBoard[row][col] != 0) {
            sudokuBoard[row][col] = 0;
            numErased++;
        }
    }

    createSudokuBoard();
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

    solvedSudoku = sudokuBoard.map(row => [...row]);
    
    removeNumbers(40);
    createDigits();
    
}
