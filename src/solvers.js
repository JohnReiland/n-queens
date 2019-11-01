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
  var solution = [];
  var board = new Board({'n': n});  // n = 4

  if (findNextRooksSolution(n, board) === true) {
    for (var i = 0; i < n; i++) {
      solution.push(board.get(i));
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.findNextRooksSolution = function(n, board) {
  var keyAndIndex = nextEmptySquare(n, board);
  if (keyAndIndex === 0) {           // board is empty
    var row = 0;
    var index = 0;
  } else if (keyAndIndex === -1) {  // last square has a queen
    if (n === 1) {
      return false;
    }
    gottenRow = board.get(n-1)
    gottenRow[n-1] = 0;
    board.set(n-1, gottenRow);
    keyAndIndex = nextEmptySquare(n, board);
    backtrack(keyAndIndex, board, row, index, n);
    keyAndIndex = nextEmptySquare(n, board);
    row = keyAndIndex[0];
    index = keyAndIndex[1];
  } else {
  var row = keyAndIndex[0];
  var index = keyAndIndex[1];
  }
  var placedQueens = 0;

  while (placedQueens < n) {
    var gottenRow = board.get(row);
    var copiedRow = [...gottenRow];
    gottenRow[index] = 1;                              // add a new queen
    board.set(row, gottenRow);

    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      board.set(row, copiedRow);

      if (index <= n - 2) {
        index++;
        continue;
      } else if (row <= n - 2) {
        row++;
        index = 0;
        continue;
      } else {
        keyAndIndex = nextEmptySquare(n, board);
        backtrack(keyAndIndex, board, row, index, n);
        arr0 = board.get(0);
        arr1 = board.get(1);           // test for signal of no solution
        if ((arr1.reduce((a, c) => a + c) > 0) && (arr0.reduce((a, c) => a + c) === 0)) {
          return false;
        }
        keyAndIndex = nextEmptySquare(n, board);
        row = keyAndIndex[0];
        index = keyAndIndex[1];
        continue;
      }
    }
    placedQueens = 0
    for (var j = 0; j < n; j++) {
      arr = board.get(j);
      if (arr.reduce((a, c) => a + c) === 1) {
        placedQueens++;
      }
    }
    if (placedQueens === n) {
      break;
    } else if (index <= n - 2) {
      index++;
      continue;
    } else if (row <= n - 2) {
      row++;
      index = 0;
      continue;
    } else {
      board.set(row, copiedRow);
      placedQueens--;
      if (placedQueens === 0) {
        return false;
      }
      keyAndIndex = nextEmptySquare(n, board);
      backtrack(keyAndIndex, board, row, index, n);
    }
  }
  return true;
};

window.findNextQueensSolution = function(n, board) {
  var keyAndIndex = nextEmptySquare(n, board);

  if (keyAndIndex === 0) {           // board is empty
    var row = 0;
    var index = 0;
  }  else if (keyAndIndex === -1) {  // last square has a queen
      debugger;                                                // [][][] Fill this out!!
                                                      // [][][] Fill this out!!
  } else {
  var row = keyAndIndex[0];
  var index = keyAndIndex[1];
  }
  var placedQueens = 0;

  while (placedQueens < n) {

    if (n > 1) {
      arr0 = board.get(0);
      arr1 = board.get(1);           // test for signal of no solution
      if ((arr1.reduce((a, c) => a + c) > 0) && (arr0.reduce((a, c) => a + c) === 0)) {
        return false;
      }
    }

    var gottenRow = board.get(row);
    var copiedRow = [...gottenRow];
    gottenRow[index] = 1;                              // add a new queen
    board.set(row, gottenRow);

    if (board.hasAnyRowConflicts() ||
        board.hasAnyColConflicts() ||
        board.hasAnyMajorDiagonalConflicts() ||
        board.hasAnyMinorDiagonalConflicts()) {
      board.set(row, copiedRow);

      if (index <= n - 2) {
        index++;
        continue;
      } else if (row <= n - 2) {
        row++;
        index = 0;
        continue;
      } else {
        keyAndIndex = nextEmptySquare(n, board);
        backtrack(keyAndIndex, board, row, index, n);
        keyAndIndex = nextEmptySquare(n, board);
        row = keyAndIndex[0];
        index = keyAndIndex[1];
        continue;
      }
    }
    placedQueens = 0
    for (var j = 0; j < n; j++) {
      arr = board.get(j);
      if (arr.reduce((a, c) => a + c) === 1) {
        placedQueens++;
      }
    }
    if (placedQueens === n) {
      break;
    } else if (index <= n - 2) {
      index++;
      continue;
    } else if (row <= n - 2) {
      row++;
      index = 0;
      continue;
    } else {
      board.set(row, copiedRow);
      placedQueens--;
      if (placedQueens === 0) {
        return false;
      }
      keyAndIndex = nextEmptySquare(n, board);
      backtrack(keyAndIndex, board, row, index, n);
      keyAndIndex = nextEmptySquare(n, board);
      row = keyAndIndex[0];
      index = keyAndIndex[1];
    }
  }
  return true;
};

window.nextEmptySquare = function(n, board) {
  var rowKey = n - 1;
  while (rowKey >= 0) {
    var testRow = board.get(rowKey);
    var indexOfElem = testRow.indexOf(1);
    if (indexOfElem === -1) {
      rowKey--;
      continue;
    } else {
      var rowQueen = rowKey
      var indexQueen = indexOfElem
      if (indexOfElem === n - 1) {
        if (rowKey === n - 1) {
          return -1;
        } else {
          rowKey++;
          indexOfElem = 0;
          return [rowKey, indexOfElem, rowQueen, indexQueen];
        }
      }
      indexOfElem++;
      return [rowKey, indexOfElem, rowQueen, indexQueen];
    };
  };
  return 0;
};

window.backtrack = function (keyAndIndex, board, row, index, n) {
  var gottenRow = board.get(keyAndIndex[2]);        // Remove the most-recently placed queen and...
  //debugger;
  gottenRow[keyAndIndex[3]] = 0;
  board.set(keyAndIndex[2], gottenRow);



  gottenRow = board.get(keyAndIndex[0]);        // ...place it into the next available square
  gottenRow[keyAndIndex[1]] = 1;
  board.set(keyAndIndex[0], gottenRow);

  nextKeyAndIndex = nextEmptySquare(n, board);      // re-initialize row and index
  if (nextKeyAndIndex === -1) {
    gottenRow[keyAndIndex[1]] = 0;
    board.set(keyAndIndex[0], gottenRow);
    keyAndIndex = nextEmptySquare(n, board);      // re-initialize row and index
    row = keyAndIndex[0];
    index = keyAndIndex[1];
    backtrack(keyAndIndex, board, row, index, n);
  } else {
    keyAndIndex = nextKeyAndIndex;
    row = keyAndIndex[0];
    index = keyAndIndex[1];
  }
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({'n': n});  // n = 4

  var solutionCount = 0;
  debugger;
  while (findNextRooksSolution(n, board) === true) {
    solutionCount++;
    console.log("solution found for board of size " + n);
  }
  debugger;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // if (n === 2) {
  //   debugger;
  // }

  var solution = [];
  var board = new Board({'n': n});  // n = 4

  if (n === 0) {
    console.log('No solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  }

  if (findNextQueensSolution(n, board) === true) {
    for (var i = 0; i < n; i++) {
      solution.push(board.get(i));
    }
  } else {
    var noSolution = new Board({'n': n});
    for (var i = 0; i < n; i++) {
      solution.push(noSolution.get(i));
    }
    console.log('No solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


