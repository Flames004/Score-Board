// Setting up the sound
const winSound = new Audio('assets/mmm-celeb.mp3');
const btnSound = new Audio('assets/pickupCoin.wav');
const whistleSound = new Audio('assets/whistle.mp3');
let dCount = Number(0); //duece count

// Function for increase button
function incScore(indexvalue) {
    btnSound.play();
    let winScore = document.getElementById('winScore').value;
    let setScore = Number(document.getElementById('winSet').value);
    let team = document.getElementsByClassName("incBtn")[indexvalue].parentElement;
    let init = Number(team.getElementsByTagName("input")[1].value);
    team.getElementsByTagName("input")[1].value = Number(init + 1);
    document.getElementById('message').textContent = 'Point of ' + document.getElementsByClassName("teamName")[indexvalue].value;

    //Set Point
    if (Number(team.getElementsByTagName("input")[1].value) == Number(winScore) - 1) {
        document.getElementById('message').textContent = 'Set point for ' + document.getElementsByClassName("teamName")[indexvalue].value;
    }

    //Game Point
    if (Number(document.getElementsByClassName('setValue')[indexvalue].textContent) == (Math.floor(setScore / 2))) {
        if (Number(team.getElementsByTagName("input")[1].value) == Number(winScore) - 1) {
            document.getElementById('message').textContent = 'Game point for ' + document.getElementsByClassName("teamName")[indexvalue].value;
        }
    }

    //Logic for duece and advantage
    if (Number(document.getElementsByClassName("scoreValue")[0].value) == (Number(winScore) - 1) && Number(document.getElementsByClassName("scoreValue")[1].value) == (Number(winScore) - 1)) {
        document.getElementById('message').textContent = 'Duece';
        dCount += 1;
        winScore = Number(winScore) + 1;
        document.getElementById('winScore').value = winScore;
    }

    // If the team wins the set
    if (team.getElementsByTagName("input")[1].value === winScore) {
        winSound.play();
        document.getElementById('message').textContent = document.getElementsByClassName('teamName')[indexvalue].value + ' wins the set';

        // Disabling the increase button
        let incBtn = document.getElementsByClassName("incBtn");
        Array.from(incBtn).forEach(element => {
            element.disabled = true;
        });

        //Logic for Set Update
        let setValue = Number(document.getElementsByClassName('setValue')[indexvalue].textContent);
        document.getElementsByClassName('setValue')[indexvalue].textContent = setValue + 1;

        //If the team wins the game
        if (Number(document.getElementsByClassName('setValue')[indexvalue].textContent) == (Math.floor(setScore / 2) + 1)) {
            document.getElementById('message').textContent = 'Congratulations ' + document.getElementsByClassName('teamName')[indexvalue].value + ' wins the game!';
            document.getElementById('gameReset').style.display = "block";
            document.getElementById('resetBtn').style.display = "none";
        }
    }
}

// Function for decrease button
function decScore(indexvalue) {
    btnSound.play();
    let team = document.getElementsByClassName("decBtn")[indexvalue].parentElement;
    let init = Number(team.getElementsByTagName("input")[1].value);
    if (init > 0) {
        team.getElementsByTagName("input")[1].value = Number(init - 1);

    }
}

// Function for reset button
function reset() {
    winSound.pause();
    winSound.load();
    whistleSound.play();
    document.getElementById('winScore').value = Number(document.getElementById('winScore').value) - dCount;
    dCount = Number(0);
    let score = document.getElementsByClassName("scoreValue");
    Array.from(score).forEach(element => {
        element.value = 0;
    });
    let incBtn = document.getElementsByClassName("incBtn");
    Array.from(incBtn).forEach(element => {
        element.disabled = false;
    });
    document.getElementById('message').textContent = "Let's PLAY !";
}

// Function for game reset button
function gameReset() {
    reset();
    let sets = document.getElementsByClassName('setValue');
    Array.from(sets).forEach(element => {
        element.textContent = 0;
    });
    document.getElementById('gameReset').style.display = "none";
    document.getElementById('resetBtn').style.display = "block";
}