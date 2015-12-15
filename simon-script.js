/* Author: Luigi Vincent
    
computer randomly picks a number between 0 and 3, inclusive.
This corresponds to a  button.
adds it to a sequence.
Plays the sequence.

After the sequence waits for user to attempt to play the sequence.
When it doesn't match, alerts the user they got it wrong.
Keeps a counter for how many rounds it takes before the user fails.

new-game to start over/restart upon game-end.
*/

function SimonButton(id, litColor, color) {
    this.color = color;
    this.id = id;
    this.litColor = litColor;
    this.highlight = function() {
        document.getElementById(id).style.background = litColor;
        setTimeout(function() {
            document.getElementById(id).style.background = color;
        }, 750);
    }
}

var buttons = [
    new SimonButton("alpha", "red", "darkred"),
    new SimonButton("beta", "yellow", "darkorange"),
    new SimonButton("gamma", "lightblue", "darkblue"),
    new SimonButton("delta", "lightgreen", "darkgreen")
];

var sequence = [];
var i_sequence = [];
var round = 0;
var sequenceIterator = 0;
playing = false;

window.onload = function() {
    alert("Try to reproduce the sequence shown.\nClick start to begin!");

    document.getElementById("newGame").onclick = function() {
        document.getElementById("newGame").value = "New Game";
        reset();
        playing = true;
        computerTurn();
    }

    for (var i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i].id).onclick = function() {
            if (playing) {
                if (buttons[sequence[sequenceIterator++]].id != this.id) {
                    gameOver();
                }
                if (sequenceIterator === sequence.length && playing) {
                    sequenceIterator = 0;
                    document.getElementById("counter").innerHTML = ++round;
                    computerTurn();
                }
            } else {
                alert("Click upper left button to start a New Game.");
            }
        }
    }
}

function computerTurn() {
    extendSequence(1);
    showSequence();
}

function reset() {
    sequence = [];
    round = 0;
    sequenceIterator = 0;
    document.getElementById("counter").innerHTML = round;
}

function gameOver() {
    playing = false;
    alert("Game Over.\nClick New Game to restart.");
}

/* Adds number items to the sequence.
*   e.g. if the sequence is 1, 3, 2,
*   calling extendSequence(2) 
*   could result in a sequence 1, 3, 2, 0, 2
*/
function extendSequence(number) {
    for (i = 0; i < number; i++) {
       sequence.push(Math.floor(Math.random() * 4)); 
    }   
}

function showSequence() {
    var i = 0;
    sequenceLoop();

    function sequenceLoop() {
        setTimeout(function() {
            buttons[sequence[i++]].highlight();
            if (i < sequence.length) {
                sequenceLoop();
            }
        }, 1000);
    }
}
