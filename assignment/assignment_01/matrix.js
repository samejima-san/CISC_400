window.onload = function () {

let input = document.getElementById("number");

//function to check whether matrix is a diagonal matrix or not
function isDiagonalMatrix(matrix) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (i != j && matrix[i][j] != 0) {
                return false;
            }
        }
    }
    return true;
}

input.innerHTML = isDiagonalMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
}