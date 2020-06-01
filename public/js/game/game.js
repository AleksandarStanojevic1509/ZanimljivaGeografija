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

export const pickRandomLetter = () =>{
    let letters = ["A", "B", "C", "Č", "Ć", "D", "Dž", "Đ", "E", "F", "G", "H", "I", "J", "K", "L", "Lj", "M", "N", "Nj", "O", "P", "R", "S", "Š", "T", "U", "V", "Z", "Ž"];
    let random = Math.floor(Math.random()*letters.length);
    return letters[random];
}

export let resetData = (userAnswersBox, playerForm) =>{
    document.getElementById('time-to-end').innerHTML = '';
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
