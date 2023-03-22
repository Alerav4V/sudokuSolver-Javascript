//Sudoku auto solver

/*

*/

const utils = require('./allFunctions_v2.js');

const puzzle = [
  0, 7, 0, 0, 2, 0, 0, 4, 6,
  0, 6, 0, 0, 0, 0, 8, 9, 0,
  2, 0, 0, 8, 0, 0, 7, 1, 5,

  0, 8, 4, 0, 9, 7, 0, 0, 0,
  7, 1, 0, 0, 0, 0, 0, 5, 9,
  0, 0, 0, 1, 3, 0, 4, 8, 0,

  6, 9, 7, 0, 0, 2, 0, 0, 8,
  0, 5, 8, 0, 0, 0, 0, 6, 0,
  4, 3, 0, 0, 8, 0, 0, 7, 0
];
//answer1
const answer = [
  8, 7, 5, 9, 2, 1, 3, 4, 6,
  3, 6, 1, 7, 5, 4, 8, 9, 2,
  2, 4, 9, 8, 6, 3, 7, 1, 5,

  5, 8, 4, 6, 9, 7, 1, 2, 3,
  7, 1, 3, 2, 4, 8, 6, 5, 9,
  9, 2, 6, 1, 3, 5, 4, 8, 7,

  6, 9, 7, 4, 1, 2, 5, 3, 8,
  1, 5, 8, 3, 7, 9, 2, 6, 4,
  4, 3, 2, 5, 8, 6, 9, 7, 1
];

var workingPuzzle = puzzle.slice(0)
var finalAnswer = puzzle.slice(0)
var correctTracker = utils.answerCheck(workingPuzzle, answer).correctTotal;
var backupCount = 0


console.log(utils.answerCheck(workingPuzzle, answer))

while (correctTracker < 81) {

  workingPuzzle = utils.oneThruNineChecker(workingPuzzle)

  workingPuzzle = utils.basicCheck(workingPuzzle)

  console.log(utils.changesCheck(finalAnswer, workingPuzzle))
  finalAnswer = workingPuzzle.slice(0)
  correctTracker = utils.answerCheck(finalAnswer, answer).correctTotal

  backupCount += 1
  if (backupCount > 20) break
}

console.log(utils.answerCheck(finalAnswer, answer))
console.log('loop counter ' + backupCount)

console.log(finalAnswer)
