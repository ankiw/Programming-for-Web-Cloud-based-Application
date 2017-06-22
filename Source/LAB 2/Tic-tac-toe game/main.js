/**
 * Created by AnkitaW on 6/18/2017.
 */
var load_zone = document.getElementById('zone');//getElementById
var localDocument;
var id = "pole";
var gameLive;
var sizeOfField;
var doubleSizeOfField;
var checkingMassive;
// console.dir(load_zone);
// console.log(document);

function doc() {
    localDocument = document;
}

//field creation
function createField(index) {
    console.log(index);
    fieldSize(index);
    initField();
    var counter = 0;
    for (var i = 0; i < sizeOfField; i++) {
        for (var j = 0; j < index; j++) {
            var div = document.createElement('div');
            div.className = "box";
            var newInput = document.createElement('input');
            newInput.type = "text";
            newInput.readOnly = true;
            newInput.id = id + counter;
            counter++;
            newInput.onclick = click;
            div.appendChild(newInput);
            load_zone.appendChild(div);
        }
    }
    localDocument = document;
    console.log(localDocument.getElementById("pole1"));
    console.log(localDocument);
}

//reloading function
function initField() {
    load_zone.innerHTML = '';
    var gameLive = true;
    var checkingMassive = [];
}

//dynamic size of field
function fieldSize(index) {
    sizeOfField = index;
    doubleSizeOfField = index * index;
    gameLive = true;
    if (index === 3) {
        load_zone.classList.remove('zone1');
        load_zone.classList.add('zone');
    } else {
        load_zone.classList.remove('zone');
        load_zone.classList.add('zone1');
    }
}

//function of pressing and calling "Х"
function click(event) {
    var target_element = document.getElementById(event.target.id);
    if (!target_element.value.length) {
        target_element.value = 'X';
        checkEndGame();
        if (gameLive) {
            AI();
            // debugger;
        }
    }
    bku();
    checkForVictory();
}

function randNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// bot
function AI() {
    console.log("run AI");
    var rand = randNum(0, doubleSizeOfField - 1);
    var elem = document.getElementById(id + rand);
    if (elem.value === 'X' || elem.value === 'O') {
        AI();// debugger;
    } else {
        elem.value = 'O';
    }
}



// var mass = [ [x,x,x,4,5,6,7,8], [0,1,2,x,x,x,6,7,8], [0,1,2,3,4,5,x,x,x], [x,1,2,x,4,5,x,7,8], [0,x,2,x,4,5,6,x,8], [0,1,x,3,4,x,6,7,x], [], [] ];

function bku() {
    localDocument = document;
    checkingMassive = [];
    for (var i = 0; i < doubleSizeOfField; i++) {
        checkingMassive[i]  = localDocument.getElementById(id + i).value;
    }
    console.log(checkingMassive);
}

//function that checking for victory through the "if" statements
function checkForVictory() {
    localDocument = document;
    if (localDocument.getElementById(id + '0').value === "X" && localDocument.getElementById(id + 1).value === "X" && localDocument.getElementById(id + 2).value === "X") {
        alert("X win");
        initField();
        createField(sizeOfField);
    }
    else if (localDocument.getElementById(id + 3).value === "X" && localDocument.getElementById(id + 4).value === "X" && localDocument.getElementById(id + 5).value === "X") {
        alert("X win");
        initField();
        createField(sizeOfField);
    }
    else if (localDocument.getElementById(id + 6).value === "X" && localDocument.getElementById(id + 7).value === "X" && localDocument.getElementById(id + 8).value === "X") {
        alert("X win");
        initField();
        createField(sizeOfField);
    }
    else if (localDocument.getElementById(id + 0).value === "X" && localDocument.getElementById(id + 4).value === "X" && localDocument.getElementById(id + 8).value === "X") {
        alert("X win");
        initField();
        createField(sizeOfField);
    }
    else if (localDocument.getElementById(id + 2).value === "X" && localDocument.getElementById(id + 4).value === "X" && localDocument.getElementById(id + 6).value === "X") {
        alert("X win");
        initField();
        createField(sizeOfField);
    }
    else if (localDocument.getElementById(id + 0).value === "X" && localDocument.getElementById(id + 3).value === "X" && localDocument.getElementById(id + 6).value === "X") {
        alert("X win");
        initField();
        createField(sizeOfField);
    }
    else if (localDocument.getElementById(id + 1).value === "X" && localDocument.getElementById(id + 4).value === "X" && localDocument.getElementById(id + 7).value === "X") {
        alert("X win");
        initField();
        createField(sizeOfField);
    }
    else if (localDocument.getElementById(id + 2).value === "X" && localDocument.getElementById(id + 5).value === "X" && localDocument.getElementById(id + 8).value === "X") {
        alert("X win");
        initField();
        createField(sizeOfField);
    }
}

//function check for End Game
function checkEndGame() {
    var count = 0;

    for (var i = 0; i < doubleSizeOfField; i++) {
        if (!document.getElementById(id + i).value) {
            ++count;
        }
    }

    if (count === 0) {
        gameLive = false;
        alert('game over');
        initField();
    }
}


