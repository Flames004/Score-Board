const winSound = new Audio('assets/mmm-celeb.mp3');
const btnSound = new Audio('assets/pickupCoin.wav');

function incScore(indexvalue) {
    btnSound.play();
    let winScore = document.getElementById('winScore').value;
    let team = document.getElementsByClassName("incBtn")[indexvalue].parentElement;
    let init = Number(team.getElementsByTagName("input")[1].value);
    team.getElementsByTagName("input")[1].value = Number(init + 1);
    document.getElementById('message').textContent = 'Point for ' + document.getElementsByClassName("teamName")[indexvalue].value;

    //Logic for duece and advantage
    if(Number(document.getElementsByClassName("scoreValue")[0].value) == (Number(winScore) - 1) && Number(document.getElementsByClassName("scoreValue")[1].value) == (Number(winScore) - 1)){
        document.getElementById('message').textContent = 'Duece';
        winScore = Number(winScore) + 1;
        document.getElementById('winScore').value = winScore;
    }

    // If the team wins
    if (team.getElementsByTagName("input")[1].value === winScore) {
        winSound.play();
        document.getElementById('message').textContent = 'Congratulations ' + document.getElementsByClassName('teamName')[indexvalue].value + ' Wins!';

        // Disabling the increase button
        let incBtn = document.getElementsByClassName("incBtn");
        Array.from(incBtn).forEach(element => {
            element.disabled = true;
        });
    }
}

const decScore = (indexvalue) => {
    btnSound.play();
    let team = document.getElementsByClassName("decBtn")[indexvalue].parentElement;
    let init = Number(team.getElementsByTagName("input")[1].value);
    if (init > 0) {
        team.getElementsByTagName("input")[1].value = Number(init - 1);

    }
}

const reset = () => {
    winSound.pause();
    winSound.load();
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
