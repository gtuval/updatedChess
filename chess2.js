class Square {
    constructor(square, rowIndex, columnIndex, availibleToStepOn, empty, tool) {
        this.square = square;
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
        this.avalibleToStepOn = availibleToStepOn;
        this.empty = empty;
        this.tool = tool;
    }

    IsEmpty() {
        return this.empty;
    }
}

class Tool {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}
let isEmpty = true;
let squareTo;
let toolTo;
let isclicked = false;
const RowSize = '8';
const SquareArr = [];
SquareArr[0]=undefined;
const firstRowColor = 'white';
const toolRows = [1, 2, 7, 8];
const lastRowColor = firstRowColor === 'black' ? 'white' : 'black';
const ToolNames = ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"];
const avalibleSquareColor = "#def2c4";
const SelectedSquareColor = "#ffe4ab";
let selectedSqure;;
let tool;


const getChessToolOnStart = (rowIndex, columnIndex) => {
    if (rowIndex === 2 || rowIndex === 7) {
        return "pawn";
    }
    //Return chess tool according to column index
    return ToolNames[columnIndex - 1];
}

const getRowColor = (rowIndex) => {
    if (rowIndex === 1 || rowIndex === 2) {
        return firstRowColor;
    }
    return lastRowColor;
}

const getIndex = (rowIndex, columnIndex) => {
    return (8 * (rowIndex - 1) + columnIndex);
}


function startGame() {
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
    document.body.appendChild(table);
    for (let rowIndex = 1; rowIndex <= RowSize; rowIndex++) {
        toolTo = undefined;
        isEmpty = true;
        let row = document.createElement('tr');
        color = getRowColor(rowIndex);
        for (let columnIndex = 1; columnIndex <= RowSize; columnIndex++) {
            let square = document.createElement('td');
            tool = getChessToolOnStart(rowIndex, columnIndex);
            if (toolRows.indexOf(rowIndex) !== -1) {
                let toolImg = document.createElement('img');
                toolImg.setAttribute('id', `${tool}_${color}`);
                toolTo = new Tool(tool, color);
                toolImg.src = `images/${color}_${tool}.png`;
                square.setAttribute(`id`, `${rowIndex}_${columnIndex}`);
                square.appendChild(toolImg);
                isEmpty = false;
            };
            squareTo = new Square(square, rowIndex, columnIndex, false, isEmpty, toolTo);
            SquareArr.push(squareTo);
            square.onclick = () => {
                isclicked = true;
                selectedSqure = SquareArr[getIndex(rowIndex, columnIndex)];
                if (selectedSqure.empty == false) {
                    switch (selectedSqure.tool.name) {
                        case 'rook': RookAvailible(rowIndex, columnIndex);
                            break;
                        case 'bishop': bishopAvailible(rowIndex, columnIndex);
                            break;
                        case 'queen': QueenAvailible(rowIndex, columnIndex);
                            break;
                        case 'king': KingAvailible(rowIndex, columnIndex);
                            break;
                        case 'pawn': PawnAvailible(rowIndex, columnIndex, selectedSqure.tool.color);
                            break;

                    }

                    ColorAll();
                    selectedSqure.style.backgroundColor = SelectedSquareColor;
                }
            }
            row.appendChild(square);

        }
        tbody.appendChild(row);
    }
    console.log(SquareArr);
}
const RookAvailible = (rowIndex, columnIndex) => {
    for (let i = 1; i < SquareArr.length; i++)

        if (SquareArr[i].rowIndex == rowIndex || SquareArr[i].columnIndex == columnIndex) {
            SquareArr[i].avalibleToStepOn = true;
        }
        else {
            SquareArr[i].avalibleToStepOn = false;
        }
}

const bishopAvailible = (rowIndex, columnIndex) => {
    for (let i = 1; i < SquareArr.length; i++) {
        if (parseInt(SquareArr[i].rowIndex) + parseInt(SquareArr[i].columnIndex) == parseInt(rowIndex) + parseInt(columnIndex) ||
            parseInt(SquareArr[i].rowIndex) - parseInt(SquareArr[i].columnIndex) == parseInt(rowIndex) - parseInt(columnIndex)) {
            SquareArr[i].avalibleToStepOn = true;
        }
        else {
            SquareArr[i].avalibleToStepOn = false;
        }
    }
}

const QueenAvailible = (rowIndex, columnIndex) => {
    for (let i = 1; i < SquareArr.length; i++) {
        if (parseInt(SquareArr[i].rowIndex) + parseInt(SquareArr[i].columnIndex) == parseInt(rowIndex) + parseInt(columnIndex) ||
            parseInt(SquareArr[i].rowIndex) - parseInt(SquareArr[i].columnIndex) == parseInt(rowIndex) - parseInt(columnIndex) ||
            SquareArr[i].rowIndex == rowIndex || SquareArr[i].columnIndex == columnIndex) {

            SquareArr[i].avalibleToStepOn = true;
        }
        else {
            SquareArr[i].avalibleToStepOn = false;
        }
    }
}

const KingAvailible = (rowIndex, columnIndex) => {
    for (let i = 1; i < SquareArr.length; i++) {
        if (parseInt(SquareArr[i].rowIndex) >= parseInt(rowIndex) - 1 && parseInt(SquareArr[i].rowIndex) <= parseInt(rowIndex) + 1 &&
            parseInt(SquareArr[i].columnIndex) >= parseInt(columnIndex) - 1 && parseInt(SquareArr[i].columnIndex) <= parseInt(columnIndex) + 1) {

            SquareArr[i].avalibleToStepOn = true;
        }
        else {
            SquareArr[i].avalibleToStepOn = false;
        }
    }
}

const PawnAvailible = (rowIndex, columnIndex, color) => {
    for (let i = 1; 1 < SquareArr.length; i++) {
        if (color == 'black') {
            if (parseInt(SquareArr[i].rowIndex) ==parseInt(rowIndex - 1)  && SquareArr[i].columnIndex == columnIndex) {
                SquareArr[i].avalibleToStepOn = true;
            }
            else {
                SquareArr[i].avalibleToStepOn = false;
            }
        }
        else {
            if (parseInt(SquareArr[i].rowIndex) ==parseInt(rowIndex + 1) && SquareArr[i].columnIndex == columnIndex) {
                SquareArr[i].avalibleToStepOn = true;
            }
            else {
                SquareArr[i].avalibleToStepOn = false;
            }
        }
    }
}
const ColorAll = () => {
    for (let i = 1; 1 <SquareArr.length; i++) {
        if (SquareArr[i].avalibleToStepOn == true) {
            SquareArr[i].square.style.backgroundColor = avalibleSquareColor;
        }
        else {
            SquareArr[i].square.style.backgroundColor = '';
        }
    }
}

