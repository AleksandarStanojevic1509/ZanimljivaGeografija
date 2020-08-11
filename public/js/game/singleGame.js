// modules
import {collectPlayerAnswers, declareWinnerAlert, pickRandomLetter, resetData} from './game.js'
import { alertBox } from '../general/general.js';

// DOM
const singleGameSubmitBtn = document.querySelector('#game-answers button');
const resultTable = document.querySelector('#result-body');
const finalScore = document.getElementById('score');
const playerForm = document.querySelector('#game-answers form');
const resultBackgound = document.getElementById('result-bck');
const alertWinnerModal = document.querySelector('#alert-winner-bck');
// const closeResultHandler = document.getElementById('close-res');
const resetGame = document.querySelector('#result button');



// Variables
let gameTime;
let countDown = 61;
let playerTotalPoints = 0;
let botTotalPoints = 0;
const category = ["Država", "Grad", "Reka", "Planina", "Životinja", "Biljka", "Predmet"];


// function
// function.create timer
const singlPlayerTimer = () => {
    gameTime = setInterval( () => {
        if(countDown === 0){
            // submituj formu i proglasi pobednika

            getWinner(playerForm);
            resultBackgound.style.display = 'block';
            // reset countDown Time 
            clearInterval(gameTime);
            countDown = 61;
            resetData(userAnswersBox, playerForm);
        }
    else {
        countDown--;
        let createTime = new Date (countDown * 1000);
        let sec = createTime.getMinutes()*60 + createTime.getSeconds() ; 
        if(sec < 10){
            document.querySelectorAll('.time-to-end').forEach(elem=>{
                elem.innerHTML = `<span style="color:red">${sec}<span>`;
            })
        }
        else{
            document.querySelectorAll('.time-to-end').forEach(elem=>{
                elem.innerHTML = `<span style="color:black">${sec}<span>`;
            })
        }
    }
}, 1000);
}

// function.add points
const checkIfItIsTrue = (answers, bot, player, plTerm, plPoints, botTerm, botPoints)=>{   
    if(answers.includes(bot) && answers.includes(player)){
        if(bot === player ){
            plTerm.innerHTML = `${player} `;
            botTerm.innerHTML = `${bot}`;
            plPoints.innerHTML = `+5`;
            botPoints.innerHTML = `+5`;
            playerTotalPoints += 5;
            botTotalPoints += 5;
            return;
        }
        else {
            plTerm.innerHTML = `${player} `;
            botTerm.innerHTML = `${bot}`;
            plPoints.innerHTML = `+10`;
            botPoints.innerHTML = `+10`;
            playerTotalPoints += 10;
            botTotalPoints += 10;
            return;
        }
    }
    if(answers.includes(bot)){
        plTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        botTerm.innerHTML = `${bot}`;
        plPoints.innerHTML = `+0`;
        botPoints.innerHTML = `+15`;
        playerTotalPoints += 0;
        botTotalPoints += 15;
        return;
    }
    if (answers.includes(player)){
        plTerm.innerHTML = `${player}`
        botTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        plPoints.innerHTML = `+15`;
        botPoints.innerHTML = `+0`;
        playerTotalPoints += 15;
        botTotalPoints += 0;
        return;
    }
    else {
        plTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        botTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        plPoints.innerHTML = `+0`;
        botPoints.innerHTML = `+0`;
        playerTotalPoints += 0;
        botTotalPoints += 0;
    }
}

// function.computer level
const finalAnswer = (chance, term) =>{
    if (chance < 0.2){            
        return '';
    }
    else {
        return term;
    }
}

// function.henerate computer answers and check answers
const getWinner = (playerForm) =>{
    let answer;
    let player = collectPlayerAnswers(playerForm)
    let possibleAnswers = [];
    category.forEach((elem)=>{
        db.collection("pojmovi")
        .where("pocetnoSlovo", "==", `${localStorage.randomLetter}`)
        .where("kategorija", "==", elem)
        .get()
        .then(snapshot => {
            const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
            if (snapshot.docs[randomIndex] === undefined){
                return  answer = '';
            }
            else {
                answer = finalAnswer(Math.random(), snapshot.docs[randomIndex].data().pojam);
            }           
            return answer;
        })
        .then( dataAN =>{
            db.collection("pojmovi")
            .where("pocetnoSlovo", "==", `${localStorage.randomLetter}`)
            .where("kategorija", "==", elem)
            .get()
            .then((data) => {
            data.docs.forEach((doc)=>{
                possibleAnswers.push(doc.data().pojam);               
            })
            switch (elem){
                case "Država":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[0], resultTable.children[0].children[1], resultTable.children[0].children[2], resultTable.children[0].children[3], resultTable.children[0].children[4]);
                    break;
                case "Grad":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[1], resultTable.children[1].children[1], resultTable.children[1].children[2], resultTable.children[1].children[3], resultTable.children[1].children[4]);
                    break;
                case "Reka":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[2], resultTable.children[2].children[1], resultTable.children[2].children[2], resultTable.children[2].children[3], resultTable.children[2].children[4]);
                    break;
                case "Planina":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[3], resultTable.children[3].children[1], resultTable.children[3].children[2], resultTable.children[3].children[3], resultTable.children[3].children[4]);
                    break;
                case "Životinja":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[4], resultTable.children[4].children[1], resultTable.children[4].children[2], resultTable.children[4].children[3], resultTable.children[4].children[4]);
                    break;
                case "Biljka":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[5], resultTable.children[5].children[1], resultTable.children[5].children[2], resultTable.children[5].children[3], resultTable.children[5].children[4]);
                    break;
                case "Predmet":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[6], resultTable.children[6].children[1], resultTable.children[6].children[2], resultTable.children[6].children[3], resultTable.children[6].children[4]);
                    break;
                }
                finalScore.children[0].innerHTML = `<p>${localStorage.username}: <span>${playerTotalPoints}</span></p>`;
                finalScore.children[1].innerHTML = `<p>Kompjuter: <span>${botTotalPoints}</span></p>`;
                if(elem === "Predmet"){
                    declareWinnerAlert (playerTotalPoints, botTotalPoints, `Kompjuter je pobedio!!!!`)
                }
            })
            playerTotalPoints = 0;
            botTotalPoints = 0;
            possibleAnswers = []
            document.querySelector('#alert-winner-bck').style.display = 'grid'
    })
    .catch((error) => {
        alertBox(alertModal, alertMsg, alertTitle, 'Žao nam je imamo previše zahteva. Pokušajte kasnije!', 'Oops!!!');
    });
})
}


//listeners

// submit when time up
window.addEventListener('load', ()=>{
    let letter = pickRandomLetter();
    localStorage.setItem('randomLetter', `${letter}`);
    document.getElementById('random-letter').innerHTML  = letter;  
    singlPlayerTimer();    
})


//submit answers
singleGameSubmitBtn.addEventListener('click', (event)=>{
    event.preventDefault();   

    getWinner (playerForm);
    resultBackgound.style.display = 'block';  
 
    resetData(playerForm);
    clearInterval(gameTime);
    countDown = 61; 
})


// close result box
// closeResultHandler.addEventListener('click', ()=>{
//     resultBackgound.style.display = 'none';
// })

// alert with winner and socore
alertWinnerModal.addEventListener('click', event => {
    event.stopPropagation()
    if (event.target.tagName === 'BUTTON'){
        alertWinnerModal.style.display = 'none'
    }

})

// reset game
resetGame.addEventListener('click', ()=>{
    resultBackgound.style.display = 'none'
    document.querySelector('.time-to-end').innerHTML = '';

    let letter = pickRandomLetter();
    localStorage.setItem('randomLetter', `${letter}`);
    document.getElementById('random-letter').innerHTML  = letter;  
    // countDown Time     
    singlPlayerTimer();
})   











