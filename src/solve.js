var solve_button = document.getElementById("solve_btn");
var reset_button = document.getElementById("reset_btn");
var grid_size = 9;

function rowSafe(row, board, val) {
    for (var col = 0; col < grid_size; col++) {
        if (board[row][col] == val) {
            return false;
        }
    }

    return true;
}

function colSafe(col, board, val) {
    for (var row = 0; row < grid_size; row++) {
        if (board[row][col] == val) {
            return false;    
        }
    }

    return true;
}

function aroundSafe(row, col, board, val) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[row + i][col + j] == val) {
                return false;    
            }
        }
    }

    return true;
}

function checkValid(row, col, board, val) {
    if (!rowSafe(row, board, val)) {
        return false;
    }

    if (!colSafe(col, board, val)) {
        return false;
    }

    if (!aroundSafe((row - row % 3), (col - col % 3), board, val)) {
        return false;
    }

    return true;
}

function runBacktrack(board) {
    console.log(board.toString());
    for (var i = 0; i < grid_size; i++) {
        for (var j = 0; j < grid_size; j++) {
            if (board[i][j] === 0) {
                for (var k = 1; k <= 9; k++) {
                    document.getElementById((i + 1).toString().concat((j + 1).toString())).value = k;
                    if (checkValid(i, j, board, k)) {
                        board[i][j] = k;
                    }

                    if (runBacktrack(board)) {
                        return true;
                    } else {
                        board[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }

    return true;
}

solve_button.onclick = function () {
    var board = new Array(grid_size);

    // Collect values from web page text input
    for (var i = 1; i <= grid_size; i++) {
        board[i - 1] = new Array(grid_size);

        for (var j = 1; j <= grid_size; j++)  {
            var tmp = document.getElementById(i.toString().concat(j.toString())).value;
            
            if (isNaN(tmp) || tmp.length == 0) { 
                board[i - 1][j - 1] = 0;
            } else if (parseInt(tmp) > 9 || parseInt(tmp) < 1) {
                board[i - 1][j - 1] = 0; 
            } else {
                board[i - 1][j - 1] = parseInt(tmp);
            }
        }
    }
    
    /*for (var i = 1; i <= grid_size; i++) {
        for (var j = 1; j <= grid_size; j++)  {
            console.log(board[i - 1][j - 1].toString()); 
        }
    }*/

    //console.log(board.toString());
    runBacktrack(board);
    //console.log(aroundSafe(2, 0, board, 2));
    for (var i = 0; i < grid_size; i++) {
        for (var j = 0; j < grid_size; j++) {
            board[i][j] = 0;
        }
    }
};

reset_button.onclick = function() {
    for (var i = 1; i <= grid_size; i++) {
        for (var j = 1; j <= grid_size; j++)  {
            document.getElementById(i.toString().concat(j.toString())).value = "";
        }
    }
    
}
