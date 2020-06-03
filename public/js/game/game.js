import {fixInputValue} from '../general/general.js'

const winnerTitle = document.querySelector ('#alert-winner h3')
const winnerScore = document.querySelector ('#alert-winner h5')

export const collectPlayerAnswers = (playerForm) =>{
    return [fixInputValue(playerForm.children[0].children[0]), 
    fixInputValue(playerForm.children[1].children[0]), 
    fixInputValue(playerForm.children[2].children[0]),
    fixInputValue(playerForm.children[3].children[0]), 
    fixInputValue(playerForm.children[4].children[0]), 
    fixInputValue(playerForm.children[5].children[0]),
    fixInputValue(playerForm.children[6].children[0])]
}

export const resetScoreTable =  (table) =>{
    table.children[0].children[1].innerHTML = '';
    table.children[0].children[2].innerHTML = '';
    table.children[0].children[3].innerHTML = '';
    table.children[0].children[4].innerHTML = '';
    table.children[1].children[1].innerHTML = '';
    table.children[1].children[2].innerHTML = '';
    table.children[1].children[3].innerHTML = '';
    table.children[1].children[4].innerHTML = '';
    table.children[2].children[1].innerHTML = '';
    table.children[2].children[2].innerHTML = '';
    table.children[2].children[3].innerHTML = '';
    table.children[2].children[4].innerHTML = '';
    table.children[3].children[1].innerHTML = '';
    table.children[3].children[2].innerHTML = '';
    table.children[3].children[3].innerHTML = '';
    table.children[3].children[4].innerHTML = '';
    table.children[4].children[1].innerHTML = '';
    table.children[4].children[2].innerHTML = '';
    table.children[4].children[3].innerHTML = '';
    table.children[4].children[4].innerHTML = '';
    table.children[5].children[1].innerHTML = '';
    table.children[5].children[2].innerHTML = '';
    table.children[5].children[3].innerHTML = '';
    table.children[5].children[4].innerHTML = '';
    table.children[6].children[1].innerHTML = '';
    table.children[6].children[2].innerHTML = '';
    table.children[6].children[3].innerHTML = '';
    table.children[6].children[4].innerHTML = ''; 
}


export const pickRandomLetter = () =>{
    let letters = ["A", "B", "C", "Č", "Ć", "D", "Dž", "Đ", "E", "F", "G", "H", "I", "J", "K", "L", "Lj", "M", "N", "Nj", "O", "P", "R", "S", "Š", "T", "U", "V", "Z", "Ž"];
    let random = Math.floor(Math.random()*letters.length);
    return letters[random];
}

export let resetData = (userAnswersBox, playerForm) =>{
    document.querySelectorAll('.time-to-end').forEach(elem=>{
        elem.innerHTML = '';
    })
    userAnswersBox.style.display = 'none';
    playerForm.reset();
}

export const declareWinnerAlert = (playerTotalPoints, oponentTotalPoints, oponentTitle)=>{
    if(playerTotalPoints > oponentTotalPoints){
        winnerTitle.innerHTML = `${localStorage.username} wins!!!!`
        winnerScore.innerHTML = `Your score is: ${playerTotalPoints}.`
    }
    else if(playerTotalPoints < oponentTotalPoints){
        winnerTitle.innerHTML = oponentTitle 
        winnerScore.innerHTML = `His score is: ${oponentTotalPoints}.`
    }
    else if(playerTotalPoints === oponentTotalPoints){
        winnerTitle.innerHTML = `It is a draw!!!`
        winnerScore.innerHTML = `You can try again.`
    }  
}
