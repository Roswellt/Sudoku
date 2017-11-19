var sudokuMatrix = new Array(9);
for (var i = 0; i < 9; i++) {
  sudokuMatrix[i] = new Array(9);
}

// Initializing the matrix with values
$(document).ready(function() {
  var rows = document.getElementsByClassName('sudoku-row');

  for (var i = 0; i < rows.length; i++) {
    var columns = $(rows[i]).children("div");
    for (var j = 0; j < columns.length; j++) {
      if ($(columns[j]).text() != null && $(columns[j]).text() != "") {
        sudokuMatrix[i][j] = $(columns[j]).text();
      } else {
        sudokuMatrix[i][j] = -1;
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
      if ($(columns[j]).children("h1").length > 0) {
        number = $(columns[j]).text();
      } else {
        number = $(columns[j]).children("input").get(0).value;
      }
      console.log(number);
      if (!(number >= 1 || number <= 9) || number == "" || !checkRow(i, number) || !checkColumn(j, number) || !checkSquare(i, j, number)) {
        valid = false;
        break;
      }
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

$("#checkButton").click(function() {
  var modalText;
  if(checkBoard) {
    modalText = "Not a valid solution!";
  } else {
    modalText = "Solved!";
  }
  $("#ex1").text(modalText);
  $("#ex1").modal();
})
