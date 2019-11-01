/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  var board = new Board({'n': n});  // n = 4
  console.log("nextEmptySquare:", nextEmptySquare(n, board));
  // var i = 0;
  // var row = 0;
  // var solution = [];
  // while (i < n) {
  //   var copiedRow = board.get(row);
  //   copiedRow[i] = 1;
  //   board.set(row, copiedRow);
  //   solution.push(copiedRow);
  //   i++;
  //   row++;
  // }

  var currTest = nextEmptySquare(n, board);
  if (currTest === -1) {                              // [][][] Fill this out!!
                                                      // [][][] Fill this out!!
  }                                                   // [][][] Fill this out!!
  var row = currTest[0];
  var index = currTest[1];
  var placedRooks = 0;

  while(placedRooks < n) {
    var gottenRow = board.get(row);
    var copiedRow = [...gottenRow];
    gottenRow[index] = 1;
  }
};
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;

  window.nextEmptySquare = function(n, board) {   // will return an array with [row, column]
    // look at the bottom row (n-1)
    // if the sum is greater than one
      // find the column (index) with a 1 (rook.queen)
    // else
      // loot the row above (row--)
    var rowKey = n - 1;
    while (rowKey >= 0) {
      var testRow = board.get(rowKey);
      var indexOfElem = testRow.indexOf(1);
      if (indexOfElem === -1) {
        rowKey--;
        continue;
      } else {
        if (indexOfElem === n - 1) {
          if(rowKey === n - 1) {
            return -1;
          } else {
            rowKey++;
            indexOfElem = 0;
            return [rowKey, indexOfElem];
          }
        }
        return [rowKey, indexOfElem + 1];
      };
    };
    return [0, 0];
  };

// arr = [[0, 1, 2, 3],
//        [4, 5, 6, 7],
//        [8, 9, 10, 11],
//        [12, 13, 14, 15]];

// arr.join("").split(",").join("").lastIndexOf(1)



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
