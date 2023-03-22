module.exports = { checkRow, indexToRowColumn, rowColumnToIndex, checkColumn, mergeArray, checkSquare, changesCheck, answerCheck, oneThruNineChecker, basicCheck }
//const utils = require('./index.js');
//var board = utils.board;

// converts index to row and column
// index -> { row, col }
function indexToRowColumn(index) {
  return { row: Math.floor(index / 9), col: index % 9 };
}

// converts row and column to index
// { row, col } -> index
function rowColumnToIndex(row, col) {
  return row * 9 + col;
}


function basicCheck (board) {
  cannotArray = []
  canArray = []

  // Gets the values it cannot not be for each cell
  board
    .forEach(function(element, index, array) {
      let rowValues = checkRow(index, array)
      let colValues = checkColumn(index, array)
      let squareValues = checkSquare(index, array)
      cannotArray[index] = mergeArray(rowValues, colValues, squareValues)
    })

  // Gets the values it can be for each cell
  cannotArray
    .forEach(function(element, index) {
      let sodukoValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      if (Array.isArray(element)) canArray[index] = sodukoValues.filter(x => !element.includes(x))
    })

  // if condition is true, updates the working puzzle with answer
  board = board
    .map(function(element, index) {
      if (element === 0 && canArray[index].length === 1) return canArray[index][0]
      else return element
    })

  return board
}


function checkRow(index, board) {
  while (board[index] != 0) {
    return "cellSolved";
  }
  var rowNum = indexToRowColumn(index).row;
  var rowValues = [];
  for (j = rowNum * 9; j < (rowNum * 9) + 9; j++) {
    rowValues[j] = board[j]
  }
  return rowValues.filter(value => value != 0)
}

function checkColumn(index, board) {
  while (board[index] != 0) {
    return "cellSolved";
  }
  var colNum = indexToRowColumn(index).col;
  var colValues = [];
  for (j = colNum; j <= (colNum + 9) * 8; j += 9) {
    colValues[j] = board[j]
  }
  return colValues.filter(value => value != 0)
}

function checkSquare(index, board) {
  while (board[index] != 0) {
    return "cellSolved";
  }
  var row1 = Math.floor(indexToRowColumn(index).row / 3) * 3;
  var col1 = Math.floor(indexToRowColumn(index).col / 3) * 3;
  var squareValues = [];
  for (r = row1; r < row1 + 3; r++) {
    for (c = col1; c < col1 + 3; c++) {
      squareValues.push(board[rowColumnToIndex(r, c)]);
    }
  }
  return squareValues.filter(value => value != 0)
}

function mergeArray(array1, array2, array3) {
  //https://stackoverflow.com/questions/40455914/concat-multiple-arrays-into-one-array-without-duplicates
  if (array1 === 'cellSolved' || array2 === 'cellSolved' || array3 === 'cellSolved') return 'cellSolved';
  mergedArray = [];
  array1
    .concat(array2, array3)
    .forEach(item => {
      if (mergedArray.indexOf(item) == -1) mergedArray.push(item);
    });
  return mergedArray.sort((a, z) => a - z);
}


// check if answers are correct
function answerCheck(a, b) {
  if (a === b) return 'puzzle solved!';
  else return whatIsWrong(a, b);
}

function whatIsWrong(a, b) {
  var comparison = { 'correctTotal': 0, 'wrongTotal': 0 };
  for (i = 0; i < a.length; i++) {
    if (a[i] === b[i]) { /*comparison['cell' + i] = 'correct'*/; comparison.correctTotal += 1 }
    else { comparison['cell' + i] = 'wrong'; comparison.wrongTotal += 1 }
  }
  return comparison
}


//check for what changes happened
function changesCheck(a, b) {
  if (a === b) return 'no changes detected';
  else return whatChanged(a, b);
}

function whatChanged(a, b) {
  var comparison = { 'noChangesTotal': 0, 'changesTotal': 0 };
  for (i = 0; i < a.length; i++) {
    if (a[i] === b[i]) { /*comparison['cell' + i] = 'no change'*/; comparison.noChangesTotal += 1 }
    else { comparison['cell' + i] = 'value changed to ' + b[i]; comparison.changesTotal += 1 }
  }
  return comparison
}


//1 through 9 checker

function oneThruNineChecker(board) {
  var oneThruNine = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  var oneThruNineCells = [] //tells me where the numbers 1 through 9 are located in the puzzle
  var cannotArray = [] //tells me what cells it CANNOT be for each number (1 through 9)
  var canArray = [] //tells me what cells it CAN be for each number (1 through 9)

  //get the cells where the numbers 1 through 9 are located in the puzzle
  oneThruNine
    .forEach(function(digit, index) {
      if (!oneThruNineCells[index]) oneThruNineCells.push([])
      board
        .forEach(function(numberInCell, cell) {
          if (digit === numberInCell) oneThruNineCells[index].push(cell)
        })
    })

  
  //get all the cells it CANNOT be for each number (1 through 9)
  oneThruNineCells
    .forEach(function(digitCells, digitIndex) {
      digitCells
        .forEach(function(cell) {
          var rowCells = oneThruNine_rowCells(cell)
          var colCells = oneThruNine_colCells(cell)
          var squareCells = oneThruNine_squareCells(cell)
          var tempArray = oneThruNine_mergeArray(rowCells, colCells, squareCells)
          
          if (!cannotArray[digitIndex]) cannotArray.push([])
          
          tempArray = [...new Set(tempArray)]
          
          cannotArray[digitIndex].push(tempArray)
          cannotArray[digitIndex] = cannotArray[digitIndex].flat()
          cannotArray[digitIndex] = [...new Set(cannotArray[digitIndex])]
          cannotArray[digitIndex].sort((a, z) => a - z)
        })

    })


  //get all the cells it CAN be for each number
  cannotArray
    .forEach(function(digitCells, digitIndex, array) {
      if (!canArray[digitIndex]) canArray.push([])
      for (i = 0; i < 81; i++) {
        if (board[i] === 0 && !array[digitIndex].includes(i) && !canArray[digitIndex].includes(i)) canArray[digitIndex].push(i)
      }
    })

  // loop through each can be values and see if there is another can be value in row, column, or square. if not, set it
  canArray
    .forEach(function(digitCells, digitIndex) {
      digitCells
        .forEach(function(cell, cellIndex, array) {
          let rowCanBes = oneThruNine_rowCanBes(cell, array)
          let colCanBes = oneThruNine_colCanBes(cell, array)
          let squareCanBes = oneThruNine_squareCanBes(cell, array)

          
          if (rowCanBes.length === 1 || colCanBes.length === 1 || squareCanBes.length === 1) {
            if (rowCanBes.length === 1) board[rowCanBes[0]] = digitIndex + 1
            if (colCanBes.length === 1) board[colCanBes[0]] = digitIndex + 1
            if (squareCanBes.length === 1) board[squareCanBes[0]] = digitIndex + 1
            
            //console.log(digitIndex+'-'+cellIndex)
            //console.log('length is 1')
            //console.log(rowCanBes)
            //console.log(colCanBes)
            //console.log(squareCanBes)
            //board[cell] = digitIndex + 1
            //console.log(board[cell])
          }
        })
    })
  return board
}


function oneThruNine_rowCells(cell) {
  let rowLookup = indexToRowColumn(cell).row
  let rowCells = []

  for (i = 0; i < 9; i++) {
    rowCells.push(rowColumnToIndex(rowLookup, i))
  }

  return rowCells
}

function oneThruNine_colCells(cell) {
  let colLookup = indexToRowColumn(cell).col
  let colCells = []

  for (i = 0; i < 9; i++) {
    colCells.push(rowColumnToIndex(i, colLookup))
  }

  return colCells
}

function oneThruNine_squareCells(cell) {
  let startingRow = Math.floor(indexToRowColumn(cell).row / 3) * 3
  let startingCol = Math.floor(indexToRowColumn(cell).col / 3) * 3
  let squareCells = []

  for (r = startingRow; r < startingRow + 3; r++) {
    for (c = startingCol; c < startingCol + 3; c++) {
      squareCells.push(rowColumnToIndex(r, c))
    }
  }

  return squareCells
}

// compare to other mergeArray function, see if logic can be combined
function oneThruNine_mergeArray(array1, array2, array3) {
  //https://stackoverflow.com/questions/40455914/concat-multiple-arrays-into-one-array-without-duplicates
  mergedArray = [];

  array1
    .concat(array2, array3)
    .forEach(item => {
      if (mergedArray.indexOf(item) == -1) mergedArray.push(item);
    });

  return mergedArray.sort((a, z) => a - z);
}


//get other values in rows
function oneThruNine_rowCanBes(cell, array) {
  let rowLookup = indexToRowColumn(cell).row
  let rowCanBes = []

  for (i = 0; i < 9; i++) {
    if (array.includes(rowColumnToIndex(rowLookup, i))) rowCanBes.push(rowColumnToIndex(rowLookup, i))
  }

  return rowCanBes
}

function oneThruNine_colCanBes(cell, array) {
  let colLookup = indexToRowColumn(cell).row
  let colCanBes = []

  for (i = 0; i < 9; i++) {
    if (array.includes(rowColumnToIndex(i, colLookup))) colCanBes.push(rowColumnToIndex(i, colLookup))
  }

  return colCanBes
}

function oneThruNine_squareCanBes(cell, array) {
  let startingRow = Math.floor(indexToRowColumn(cell).row / 3) * 3
  let startingCol = Math.floor(indexToRowColumn(cell).col / 3) * 3
  let squareCanBes = []
  //console.log('test')

  for (r = startingRow; r < startingRow + 3; r++) {
    for (c = startingCol; c < startingCol + 3; c++) {
      if (array.includes(rowColumnToIndex(r, c))) squareCanBes.push(rowColumnToIndex(r, c))
    }
  }

  return squareCanBes
}
