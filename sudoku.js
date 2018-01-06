// var sudokuMatrix = new Array(9);
var sudokuMatrix = table;
var staticMatrix = new Array(9);
for (var i = 0; i < 9; i++) {
  staticMatrix[i] = new Array(9);
}

// Initializing the matrix with values
$(document).ready(function() {
  var rows = document.getElementsByClassName('sudoku-row');

  for (var i = 0; i < rows.length; i++) {
    var columns = $(rows[i]).children("div");
    for (var j = 0; j < columns.length; j++) {
      if (sudokuMatrix[i][j] != 0) {
        staticMatrix[i][j] = true;
        $(columns[j]).append("<h1 class=\"number set\">" + sudokuMatrix[i][j] + "</h1>");
      } else {
        staticMatrix[i][j] = false;
        $(columns[j]).append("<input class =\"number unset\" type=\"number\" step=\"1\" pattern=\"\d{1}\"/>");
      }
      $(columns[j]).data('position', {
        row: i,
        column: j
      });
    }
    // console.log(columns);
  }
  // console.log(sudokuMatrix);
});

// Check column for duplicates
function checkColumn(column, number) {
  var count = 0;
  var valid = true;

  for (var rowNum = 0; rowNum < 9; rowNum++) {
    if (sudokuMatrix[rowNum][column] == number) {
      count++;
    }
  }
  if (count > 1) {
    valid = false;
  }
  return valid;
}
// Check row for duplicates
function checkRow(row, number) {
  var count = 0;
  var valid = true;

  for (var columnNum = 0; columnNum < 9; columnNum++) {
    if (sudokuMatrix[row][columnNum] == number) {
      count++;
    }
  }
  if (count > 1) {
    valid = false;
  }
  return valid;
}
// Check square for duplicates
function checkSquare(row, column, number) {
  var startOfRow = 6;
  var startOfColumn = 6;
  var count = 0;
  var valid = true;

  for (startOfRow; startOfRow >= 0; startOfRow -= 3) {
    if (row >= startOfRow) {
      break;
    }
  }
  for (startOfColumn; startOfColumn >= 0; startOfColumn -= 3) {
    if (column >= startOfColumn) {
      break;
    }
  }
  for (var rowIncrement = 0; rowIncrement < 3; rowIncrement++) {
    for (var columnIncrement = 0; columnIncrement < 3; columnIncrement++) {
      if (sudokuMatrix[startOfRow + rowIncrement][startOfColumn + columnIncrement] == number) {
        count++;
      }
    }
    if (count > 1) {
      valid = false;
    }
  }
  return valid;
}

function checkBoard() {
  var rows = document.getElementsByClassName('sudoku-row');
  var valid = true;

  for (var i = 0; i < rows.length; i++) {
    if (!valid) {
      break;
    }
    var columns = $(rows[i]).children("div");
    for (var j = 0; j < columns.length; j++) {
      var number;
      var count = 0;
      if ($(columns[j]).children("h1").length > 0) {
        number = $(columns[j]).text();
      } else {
        number = $(columns[j]).children("input").get(0).value;
      }
      count += number;
      if (!(number >= 1 || number <= 9) || number == "" || !checkRow(i, number)) {
        valid = false;
        break;
      }
    }
    // Check if numbers in row are unique 1-9
    if (count != 45) {
      valid = false;
      break;
    }
  }
  return valid;
}

// Limit the input to 1 digit from 1-9
$('.number').keypress(function(event) {
  if ($(this).val().length >= 1) event.preventDefault();
  else if (event.keyCode < 49 || event.keyCode > 57) event.preventDefault();
  else {
    // console.log(String.fromCharCode(event.keyCode));
    var position = $(this).parent().data('position');
    // console.log(position);
    sudokuMatrix[position.row][position.column] = String.fromCharCode(event.keyCode);
    checkColumn(position.column, String.fromCharCode(event.keyCode));
    checkRow(position.row, String.fromCharCode(event.keyCode));
    checkSquare(position.row, position.column, String.fromCharCode(event.keyCode));
    // console.log(sudokuMatrix);
  }
});

// Checks if sudoku is a valid solution
$("#checkButton").click(function() {
  var modalText;
  if (checkBoard) {
    modalText = "Not a valid solution!";
  } else {
    modalText = "Solved!";
  }
  $("#ex1").text(modalText);
  $("#ex1").modal();
})

// Solves the sudoku using backtracking
$("#solveButton").click(function() {

  for(var row = 0; row < 9; row++) {
    var count = 1;
    var forward = true;

    for(var column = 0; column < 9; column++) {
      if(staticMatrix[row][column] == true) {
        if(!forward) {
          if(column > 0) {
            column -= 2;
            count = sudokuMatrix[row][column + 1] + 1;
          } else if (column == 0) {
            row -= 1;
            column = 7;
            count = sudokuMatrix[row][column + 1] + 1;
          }
        }
      } else {
        sudokuMatrix[row][column] = count;
        if(checkRow(row, count) && checkColumn(column, count) && checkSquare(row, column, count) && count <= 9) {
          count = 1;
          forward = true;
        } else {
          count++;
          if(count > 9 && column > 0) {
            sudokuMatrix[row][column] = 0;
            column -= 2;
            count = sudokuMatrix[row][column + 1] + 1;
            forward = false;
          } else if (count > 9 && column == 0) {
            sudokuMatrix[row][column] = 0;
            row -= 1;
            column = 7;
            count = sudokuMatrix[row][column + 1] + 1;
            forward = false;
          } else if (count <= 9) {
            column -= 1;
          }
        }
      }
    }
  }
})
