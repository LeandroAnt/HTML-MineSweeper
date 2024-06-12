const numberOfMines = 15;
const rows = 10;
const lines = 10;
let counter = 0;

function createButtons() {
    const container = document.getElementById("mines");
    for (let i = 0; i < rows * lines; i++) {
        const button = document.createElement("button");
        button.classList.add("mine");
        button.classList.add("mineButton");
        button.id = i;
        button.onclick = mineTap;
        container.appendChild(button);
    }
}

function minesLeft() {
    const container = document.getElementById("mines");
}

function loadMines() {
    const mines = document.getElementsByClassName("mine");
    let counter = 0;
    do {
        for (let i = 0; i < lines * rows; i++) {
            const isMine = Math.random() > 0.9;
            if (isMine && !(mines[i].classList.contains("mineBomb")) && counter < numberOfMines) {
                mines[i].classList.add("mineBomb");
                counter++;
            }
        }
    } while (counter < numberOfMines);
}

function mineTap() {
    if (this.classList.contains("mineBomb")) {
        alert("Game over!");
        reloadPage();
    } else {
        changeButtonToText(this, calculateMinesAround(this.id));
        counter++;
    }
    if (counter===(rows*lines)-numberOfMines){
        setTimeout(() =>{ alert("You won!");},500)
        setTimeout(() =>{ reloadPage();},600)
    }
}

function calculateMinesAround(id) {
    const mines = document.getElementsByClassName("mine");
    const index = parseInt(id);
    const rows = 10;
    const lines = 10;
    let minesAround = 0;
    if (index === 0) {
        positions = [
            index + 1,
            index + 10,
            index + 11
        ];
    } else if (index === 9) {
        positions = [
            index - 1,
            index + 10,
            index + 9
        ];
    } else if (index === 90) {
        positions = [
            index - 9,
            index + 1,
            index - 10
        ];
    } else if (index === 99) {
        positions = [
            index - 1,
            index - 10,
            index - 11
        ];
    } else if (index % 10 === 0) {
        positions = [
            index + 1,
            index + 10,
            index - 10,
            index + 11,
            index - 9
        ];
    } else if (index % 10 === 9) {
        positions = [
            index - 1,
            index + 10,
            index - 10,
            index - 11,
            index + 9
        ];
    } else if (Math.floor(index / 10) === 0) {
        positions = [
            index - 1,
            index + 1,
            index + 10,
            index + 9,
            index + 11
        ];
    } else if (Math.floor(index / 10) === 9) {
        positions = [
            index - 1,
            index + 1,
            index - 10,
            index - 9,
            index - 11
        ];
    } else {
        positions = [
            index - 1,
            index + 1,
            index + 10,
            index - 10,
            index + 9,
            index - 9,
            index + 11,
            index - 11
        ];
    }
    for (let i = 0; i < positions.length; i++) {
        if (positions[i] >= 0 && positions[i] < rows * lines) {
            if (mines[positions[i]].classList.contains("mineBomb")) {
                minesAround++;
            }
        }
    }
    return minesAround;
}

function changeButtonToText(buttonId, text) {
    const div = document.createElement("div");
    div.classList.add("mine");
    div.id = "emptyMine";
    const textNode = document.createTextNode(text);
    div.appendChild(textNode);
    buttonId.parentNode.replaceChild(div, buttonId);
}

function reloadPage() {
    location.reload();
}

createButtons();
loadMines();