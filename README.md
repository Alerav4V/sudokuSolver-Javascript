# sudokuSolver-Javascript
Sudoku solver using Javascript
This was created to test my skills with Javascript

project status: in progress
- can solve basic puzzles

currently uses two strategies to solve the puzzle
1. Basic elimination
   -  loops through each cell of the puzzle
   -  gets the values in the row, column, and square. these are the values it cannot be for the cell
   -  gets the values that are not in the row, column, and square. these are the values it can be for the cell
   -  if the cell can only be one value, it'll set that value in the cell
