// canvas and html elements
var canvas = null;
var graphics = null;
function init() {
    canvas = document.getElementById('canvas');
    window.addEventListener("keypress", doKeyDown, false);
    graphics = canvas.getContext("2d");
}
// user input
function doKeyDown(e) {
    switch (e.keyCode) {
        case 37:
            if (grid.canFit(-1, 0))
                curPiece.moveLeft();
            break;
        case 39:
            if (grid.canFit(1, 0))
                curPiece.moveRight();
            break;
        case 40:
            while (grid.canFit(0, 1))
                curPiece.moveDown();
            break;
        case 38:
            curPiece.rotate();
            break;
    }
}

// grid
const HEIGHT = 20;
const WIDTH = 10;
const TILE_SIZE = 20;
var grid = {
    grid: [],
    // initialize the grid to all blank
    init: function() {
        for (var i = 0; i < HEIGHT; i++) {
            grid[i] = [];
            for (var j = 0; j < WIDTH; j++) {
                grid[i][j] = PieceTypes.BLANK;
            }
        }
    },
    // check if a piece will fit in a new position
    canFit: function(dx, dy) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (curPiece.map[i][j]) {
                    var newY = curPiece.y + i + dy;
                    var newX = curPiece.x + j + dx;
                    //out of bounds
                    if (newY > 19 || newY < 0 || newX > 9 || newX < 0)
                        return false;
                    //piece already exists
                    if (grid[newY][newX])
                        return false;
                }
            }
        }
        return true;
    },
    willRotate: function(newMap) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (newMap[i][j]) {
                    var newY = curPiece.y + i;
                    var newX = curPiece.x + j;
                    //out of bounds
                    if (newY > 19 || newY < 0 || newX > 9 || newX < 0)
                        return false;
                    //piece already exists
                    if (grid[newY][newX])
                        return false;
                }
            }
        }
        return true;
    },
    // add the current piece to the grid
    addToGrid: function() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (curPiece.map[i][j]) {
                    if (!grid[curPiece.y + i][curPiece.x + j]) {
                        grid[curPiece.y + i][curPiece.x + j] = curPiece.map[i][j];
                    } else {
                        gameover = true;
                        return;
                    }
                }
            }
        }
    },
    // check for completed rows
    checkForCompletes: function() {
        for (var i = 0; i < HEIGHT; i++) {
            for (var j = 0; j < WIDTH; j++) {
                if (!grid[i][j])
                    break;
                if (j === WIDTH - 1) {
                    for (var x = 0; x < WIDTH; x++)
                        grid[i][x] = PieceTypes.BLANK;
                    grid.moveDownFrom(i);
                    score += 100;
                    $("#score").html("" + score);
                    i--;
                }
            }
        }
    },
    // move the board down from row
    moveDownFrom: function(row) {
        for (var i = row; i > 0; i--) {
            for (var j = 0; j < WIDTH; j++) {
                grid[i][j] = grid[i-1][j];
            }
        }
        for (var j = 0; j < WIDTH; j++) {
            grid[0][j] = PieceTypes.BLANK;
        }
    },
    // draw the grid
    drawGrid: function() {
        for (var i = 0; i < HEIGHT; i++) {
            for (var j = 0; j < WIDTH; j++) {
                graphics.fillStyle = PieceColor[grid[i][j]];
                graphics.fillRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                graphics.strokeStyle = "#CCC";
                if (grid[i][j]){
                    graphics.strokeStyle = "#000";
                }
                graphics.strokeRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE)
            }
        }
    }
};

// pieces
var curPiece;
var nextType;
var PieceTypes = { BLANK: 0, I: 1, J: 2, L: 3, O: 4, S: 5, T: 6, Z: 7 };
var PieceColor = ["#FFFFFF", "#00FFFF", "#0000FF", "#FF8800", "#FFFF00",
                    "#00FF00", "#FF00FF", "#FF0000"];
                    //White, Cyan, Blue, Orange, Yellow, Green, Purple, Red
function piece() {
    this.x = 3;
    this.y = -1;
    this.map = [];
    this.type = 0;
    this.rotationState = 0;
    // make the map a 4x4 2d array of blanks
    this.init = function() {
        this.x = 3;
        this.y = -1;
        this.map = [];
        this.type = 0;
        this.rotationState = 0;
        for (var i = 0; i < 4; i++) {
            this.map[i] = [];
            for (var j = 0; j < 4; j++) {
                this.map[i][j] = PieceTypes.BLANK;
            }
        }
    }
    this.moveDown = function()  { this.y++; }
    this.moveLeft = function()  { this.x--; }
    this.moveRight = function() { this.x++; }
    this.rotate = function() {
        var newMap = [];
        for (var i = 0; i < 4; i++) {
            newMap[i] = [];
            for (var j = 0; j < 4; j++) {
                newMap[i][j] = PieceTypes.BLANK;
            }
        }
        var newRot = (this.rotationState + 1) % 4;
        newMap = shapePiece(newMap, this.type, newRot);
        if (grid.willRotate(newMap)) {
            this.rotationState = newRot;
            this.map = newMap;
        }
    }
    this.makeType = function(type) {
        this.type = type;
        this.map = shapePiece(this.map, this.type, this.rotationState);
    }
    this.drawPiece = function() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.x + j >= 0 && this.x + j < 10 &&
                    this.y + i >= 0 && this.y + j < 20 &&
                    this.map[i][j]){
                    graphics.fillStyle = PieceColor[this.map[i][j]];
                    graphics.fillRect((this.x + j) * TILE_SIZE,
                                        (this.y + i) * TILE_SIZE,
                                        TILE_SIZE, TILE_SIZE);
                    graphics.strokeStyle = "#000000";
                    graphics.strokeRect((this.x + j) * TILE_SIZE,
                                        (this.y + i) * TILE_SIZE,
                                        TILE_SIZE, TILE_SIZE);
                }
            }
        }
    }
};

//game
var gameover = false;
var score = 0;
//update
function movePiece() {
    if (grid.canFit(0, 1)){
        curPiece.moveDown();
    }
    else {
        grid.addToGrid();
        if (!gameover) {
            grid.checkForCompletes();
            curPiece.init();
            curPiece.makeType(nextType);
            nextType = Math.floor(Math.random() * 7) + 1;
        }
    }
}
//render
function drawGame() {
    grid.drawGrid();
    curPiece.drawPiece();
}
//init
function initGame() {
    grid.init();
    curPiece = new piece();
    curPiece.init();
    curPiece.makeType(Math.floor(Math.random() * 7) + 1);
    nextType = Math.floor(Math.random() * 7) + 1;
    gameover = false;
    score = 0;
    $("#score").html("" + score);
}

$(document).ready(function() {
    init();
    initGame();
    requestAnimationFrame(loop);
});

var frames = 0;
function loop() {
    frames++;
    if (!gameover) {
        //update
        if (frames % 20 === 0)
            movePiece();
        //render
        drawGame();
    } else {
        initGame();
    }
    requestAnimationFrame(loop);
}

function shapePiece(map, type, rS) {
    switch (type) {
        case PieceTypes.I:
           map[1][2] = type;
           if (rS % 2 === 0) {
               map[1][0] = type;
               map[1][1] = type;
               map[1][3] = type;
           } else {
               map[0][2] = type;
               map[2][2] = type;
               map[3][2] = type;
           }
           break;
        case PieceTypes.J:
           map[1][2] = type;
           if (rS === 0) {
               map[1][1] = type;
               map[1][3] = type;
               map[2][3] = type;
           } else if (rS === 1) {
               map[0][2] = type;
               map[0][3] = type;
               map[2][2] = type;
           } else if (rS === 2) {
               map[0][1] = type;
               map[1][1] = type;
               map[1][3] = type;
           } else {
               map[0][2] = type;
               map[2][1] = type;
               map[2][2] = type;
           }
           break;
        case PieceTypes.L:
           map[1][2] = type;
           if (rS === 0) {
               map[1][1] = type;
               map[1][3] = type;
               map[2][1] = type;
           } else if (rS === 1) {
               map[0][2] = type;
               map[2][3] = type;
               map[2][2] = type;
           } else if (rS === 2) {
               map[0][3] = type;
               map[1][1] = type;
               map[1][3] = type;
           } else {
               map[0][2] = type;
               map[0][1] = type;
               map[2][2] = type;
           }
           break;
        case PieceTypes.O:
           map[1][1] = type;
           map[1][2] = type;
           map[2][1] = type;
           map[2][2] = type;
           break;
        case PieceTypes.S:
           map[1][2] = type;
           map[1][3] = type;
           if (rS % 2 === 0) {
               map[2][2] = type;
               map[2][1] = type;
           } else {
               map[0][2] = type;
               map[2][3] = type;
           }
           break;
        case PieceTypes.T:
           map[1][2] = type;
           if (rS === 0) {
               map[1][1] = type;
               map[1][3] = type;
               map[2][2] = type;
           } else if (rS === 1) {
               map[0][2] = type;
               map[1][3] = type;
               map[2][2] = type;
           } else if (rS === 2) {
               map[1][1] = type;
               map[1][3] = type;
               map[0][2] = type;
           } else {
               map[1][1] = type;
               map[0][2] = type;
               map[2][2] = type;
           }
           break;
        case PieceTypes.Z:
           map[1][2] = type;
           map[2][2] = type;
           if (rS % 2 === 0) {
               map[1][1] = type;
               map[2][3] = type;
           } else {
               map[0][3] = type;
               map[1][3] = type;
           }
           break;
    }
    return map;
}
