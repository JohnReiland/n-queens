// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    hasArrayConflict: function(array) {
      console.log("this.attributes:", this.attributes);
      console.log("array:", array);
      return array.length === 0 ? false : array.reduce((a, c) => a + c) > 1;
    },



    hasRowConflictAt: function(rowIndex) {
      return this.hasArrayConflict(this.attributes[rowIndex]);
    },

    // fix hasRowConflictAt in case function is called more than necessary

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var key in this.attributes) {
        if (key !== "n") {
          if (this.hasRowConflictAt(key)) {
            return true;
          }
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var arr = [];
      var obj = this.attributes;
      for (var key in obj) {
        var row = obj[key];
        if (key !== "n") {
          arr.push(row[colIndex]);
        }
      }
      return this.hasArrayConflict(arr);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var key in this.attributes) {
        if (this.hasColConflictAt(key)) {
          return true;
        }
      }
      return false;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var obj = this.attributes;
      var column = 0;
      var row = 0;
      var n = Object.keys(obj).length - 1;
      var index = majorDiagonalColumnIndexAtFirstRow;
      if (index > 0) {
        column = index;
      } else if (index < 0) {
        row = -index;
      }
      var arr = [];
      while (row < n && column < n) {
        arr.push(obj[row][column]);
        column++;
        row++;
      }
      return this.hasArrayConflict(arr);
    },

    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {  // assume 0
    //   var arr = [];
    //   var obj = this.attributes;
    //   var keys = Object.keys(obj);
    //   var count = majorDiagonalColumnIndexAtFirstRow;
    //   console.log("major...:", count);
    //   console.log("this.attributes:", this.attributes);
    //   for (var i = 0; i < keys.length; i++) {
    //     if (keys[i] !== undefined && keys[i] !== 'n') { // obj[keys[i][count]] !== undefined
    //       arr.push(obj[i][count]);
    //       console.log("obj[i]:", obj[i]);
    //       console.log("obj[i][count]:", obj[i][count]);
    //       count++;
    //     }
    //   }
    //   console.log("arr:", arr);
    //   //return arr.length > 0 ? this.hasArrayConflict(arr) : false;
    //   return this.hasArrayConflict(arr);
    // },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var obj = this.attributes;
      var n = Object.keys(obj).length - 1;
      var max = n - 1;
      var min = -max;
      while(min < max) {
        if (this.hasMajorDiagonalConflictAt(min)) {
          return true;
        }
        min++;
      };
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // console.log("minorDiagonalColumnIndexAtFirstRow:", minorDiagonalColumnIndexAtFirstRow);
      var obj = this.attributes;
      var n = obj.n;
      var column = n - 1;
      var row = 0;
      var index = minorDiagonalColumnIndexAtFirstRow;
      if (index > n - 1) {
        row = (index - n) + 1;
      } else if (index < n ) {
        column = index;
      }
      var arr = [];
      while (column >= 0 && row < n) {
        arr.push(obj[row][column]);
        column--;
        row++;
      }
      return this.hasArrayConflict(arr);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = Object.keys(obj).length - 1;
      var max = ((n - 1) * 2);
      var min = 0;
      while (min <= max) {
        if (this.hasMinorDiagonalConflictAt(min)) {
          return true;
        }
        min++;
      };
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
