function incScore(indexvalue) {
    let team = document.getElementsByClassName("incBtn")[indexvalue].parentElement;
    let init = Number(team.getElementsByTagName("input")[1].value);
    team.getElementsByTagName("input")[1].value = Number(init + 1);
}

const decScore = (indexvalue) => {
    let team = document.getElementsByClassName("decBtn")[indexvalue].parentElement;
    let init = Number(team.getElementsByTagName("input")[1].value);
    if(init>0){
        team.getElementsByTagName("input")[1].value = Number(init - 1);
    }
}

const reset = () =>{
    let score = document.getElementsByClassName("scoreValue");
    Array.from(score).forEach(element => {
        element.value = 0;
    });
}