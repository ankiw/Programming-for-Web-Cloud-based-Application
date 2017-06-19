var user;
var choose = function(choice) {
    user = choice;
}

var computerChoice = Math.random();
if (computerChoice < 0.34) {
    computerChoice = "rock";
}
else if (computerChoice < 0.67) {
    computerChoice = "paper";
}
else {
    computerChoice = "scissors";
}

var compare = function(choice1, choice2) {
    if (choice1 === choice2) {
        document.getElementById("result").innerHTML = "Tie!";
    }
    else if (choice1 === "rock") {
        if (choice2 === "scissors") {
            document.getElementById("result").innerHTML = "You Win!";
        }
        else {
            document.getElementById("result").innerHTML = "You Lose!";
        }
    }
    if (choice1 === "paper") {
        if (choice2 === "rock") {
            document.getElementById("result").innerHTML = "You Win!";
        }
        else if (choice2 ==="scissors") {
            document.getElementById("result").innerHTML = "You Lose!";
        }
    }
    if (choice1 === "scissors") {
        if (choice2 === "rock") {
            document.getElementById("result").innerHTML = "You Lose!";
        }
        else if (choice2 === "paper") {
            document.getElementById("result").innerHTML = "You Win!";
        }
    }
    else {
        document.getElementById("result").innerHTML = "ERROR!";
    }
}