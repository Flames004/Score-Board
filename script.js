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

//Function to activate dark mode
const toggle = document.getElementById('toggle');
const body = document.body;

toggle.addEventListener('input', (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
});

//Logic for sports timer
let play = document.getElementById("play");
let pause = document.getElementById("pause");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let controls = document.getElementsByTagName("button");
let minuteSet = minutes.value;
let secondSet = seconds.value;
let countdown;


Array.from(controls).forEach(element => {
    element.addEventListener('click', () => {
        if (element.id == "play") {
            playTime();
        }

        if (element.id == "pause") {
            pauseTime();
        }

        if (element.id == "timer-reset") {
            resetTime();
        }

    })
});

function padNumber(unit) {   //to get the leading zeroes
    let result = unit.toString().padStart(2, '0');
    return result;
}

function playTime() {
    countdown = setTimeout(() => {
        if (seconds.value > 0) {
            seconds.value = padNumber(seconds.value - 1);
        }
        if (seconds.value == 0 && minutes.value > 0) {
            minutes.value = padNumber(minutes.value - 1);
            seconds.value = 59;
        }
        if (seconds.value == 0 && minutes.value == 0) {
            play.hidden = false;
            pause.hidden = true;
            alert("Time's Up!");
        }
        else {
            playTime();
        }
    }, 1000);
    play.hidden = true;
    pause.hidden = false;
}

function pauseTime() {
    clearInterval(countdown);
    play.hidden = false;
    pause.hidden = true;
}

function resetTime() {
    // console.log("reset clicked");
    pauseTime();
    minutes.value = minuteSet;
    seconds.value = secondSet;
}