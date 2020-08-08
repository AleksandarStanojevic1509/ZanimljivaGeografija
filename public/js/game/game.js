import {fixInputValue} from '../general/general.js'

const winnerTitle = document.querySelector ('#alert-winner h4')
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
    document.querySelectorAll('.time-to-end').forEach(elem=>{
        elem.innerHTML = '';
    })
    userAnswersBox.style.display = 'none';
    playerForm.reset();
}

export const declareWinnerAlert = (playerTotalPoints, oponentTotalPoints, oponentTitle)=>{
    if(playerTotalPoints > oponentTotalPoints){
        winnerTitle.innerHTML = `${localStorage.username} je pobedio!!!!`
        winnerScore.innerHTML = `Tvoj rezultat je: ${playerTotalPoints}.`
    }
    else if(playerTotalPoints < oponentTotalPoints){
        winnerTitle.innerHTML = oponentTitle 
        winnerScore.innerHTML = `Njegov rezultat je: ${oponentTotalPoints}.`
    }
    else if(playerTotalPoints === oponentTotalPoints){
        winnerTitle.innerHTML = `Nerešeno je!!!`
        winnerScore.innerHTML = `Možete da pokušate ponovo.`
    }  
}
