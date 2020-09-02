// modules
import {collectPlayerAnswers, declareWinnerAlert, pickRandomLetter, resetData } from './game.js'
import { alertBox, renderHelp } from '../general/general.js';


// DOM
const singleGameSubmitBtn = document.querySelector('#game-answers button');
const resultTable = document.querySelector('#result-body');
const finalScore = document.getElementById('score');
const playerForm = document.querySelector('#game-answers form');
const resultBackgound = document.getElementById('result-bck');
const alertWinnerModal = document.querySelector('#alert-winner-bck');
// const closeResultHandler = document.getElementById('close-res');
const resetGame = document.querySelector('#result button');
const sound = document.querySelectorAll('.hover-sound-t');


//dom.help
const helpHandler = document.querySelectorAll('.help');
const helpModal = document.getElementById('help-modal-bck');



// Variables
let gameTime;
let countDown = 91;
let userPoints = 0;
let opponentPoints = 0;

const category = ["Država", "Grad", "Reka", "Planina", "Životinja", "Biljka", "Predmet"];


// function
// function.create timer
const singlPlayerTimer = () => {
    gameTime = setInterval( () => {
        if(countDown === 0){
            // submituj formu i proglasi pobednika

            getWinnerSingleGame(playerForm);
            resultBackgound.style.display = 'block';
            // reset countDown Time 
            clearInterval(gameTime);
            countDown = 91;
            // resetData(userAnswersBox, playerForm);
        }
    else {
        countDown--;
        let createTime = new Date (countDown * 1000);
        let sec = createTime.getMinutes()*60 + createTime.getSeconds() ; 
        if(sec < 10){
            let sound = new Audio ('../sounds/timer.wav');
            sound.volume = 0.5;
            sound.play();
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


const addPoints = (user, opponent, plTerm, plPoints, botTerm, botPoints) =>{
    if(user !== '' && opponent !== ''){
        if(user === opponent ){
            plTerm.innerHTML = `${user} `;
            botTerm.innerHTML = `${opponent}`;
            plPoints.innerHTML = `+5`;
            botPoints.innerHTML = `+5`;
            userPoints += 5;
            opponentPoints += 5;
            return;
        }
        else {
            plTerm.innerHTML = `${user} `;
            botTerm.innerHTML = `${opponent}`;
            plPoints.innerHTML = `+10`;
            botPoints.innerHTML = `+10`;
            userPoints += 10;
            opponentPoints += 10;
            return;
        }
    }
    if(user == '' && opponent !== ''){
        plTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        botTerm.innerHTML = `${opponent}`;
        plPoints.innerHTML = `+0`;
        botPoints.innerHTML = `+15`;
        userPoints += 0;
        opponentPoints += 15;
        return;
    }
    if (user !== '' && opponent == ''){
        plTerm.innerHTML = `${user}`
        botTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        plPoints.innerHTML = `+15`;
        botPoints.innerHTML = `+0`;
        userPoints += 15;
        opponentPoints += 0;
        return;
    }
    else {
        plTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        botTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        plPoints.innerHTML = `+0`;
        botPoints.innerHTML = `+0`;
        userPoints += 0;
        opponentPoints += 0;
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

// fuction.generate copmuter answers
const generateBotAnswer = (category, firstLetter) =>{
    let singleAnswer = new Promise ((resolve, reject)=>{
        let answer;
        let key = db.collection('pojmovi').doc().id;
        // console.log(key)
        db.collection('pojmovi')
        .where('kategorija', '==', category)
        .where('pocetnoSlovo', '==', firstLetter)
        .where(firebase.firestore.FieldPath.documentId(), '>=', key)
        .limit(1)
        .get()
        .then(snapshot => {
            const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
            if (snapshot.docs[randomIndex] === undefined){
                answer = '';
            }
            else {
                answer = finalAnswer(Math.random(), snapshot.docs[randomIndex].data().pojam);
            }           
            resolve(answer);
        })
    }) 
    return singleAnswer;
}

// function.check does player answers exist in db 
const checkPlayerAnswer = (category, answer) =>{
    return new Promise((resolve, reject)=>{
        db.collection("pojmovi")
        .where("kategorija", "==", `${category}`)
        .where("pojam", "==", `${answer}`)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                resolve(answer);
            }            
            else{
                resolve('');
            }
        })
    })
}


// function.get winner
const getWinnerSingleGame = async(userAnsw)=>{

    let playerAnswers = collectPlayerAnswers(userAnsw);

    let corectAnswers = await Promise.all([checkPlayerAnswer('Država', playerAnswers[0]),
                                            checkPlayerAnswer('Grad', playerAnswers[1]),
                                            checkPlayerAnswer('Reka', playerAnswers[2]),
                                            checkPlayerAnswer('Planina', playerAnswers[3]),
                                            checkPlayerAnswer('Životinja', playerAnswers[4]),
                                            checkPlayerAnswer('Biljka', playerAnswers[5]),
                                            checkPlayerAnswer('Predmet', playerAnswers[6]),
                                    ]);

    let botAnswers = await Promise.all([generateBotAnswer('Država', localStorage.randomLetter), 
                                        generateBotAnswer('Grad', localStorage.randomLetter),
                                        generateBotAnswer('Reka', localStorage.randomLetter),
                                        generateBotAnswer('Planina', localStorage.randomLetter),
                                        generateBotAnswer('Životinja', localStorage.randomLetter),
                                        generateBotAnswer('Biljka', localStorage.randomLetter),
                                        generateBotAnswer('Predmet', localStorage.randomLetter),
                                    ]);                         

    for(let i = 0; i < playerAnswers.length; i++ ){
        addPoints(corectAnswers[i], botAnswers[i], resultTable.children[i].children[1], resultTable.children[i].children[2], resultTable.children[i].children[3], resultTable.children[i].children[4])
    }

    finalScore.children[0].innerHTML = `<p>${localStorage.username}: <span>${userPoints}</span></p>`;
    finalScore.children[1].innerHTML = `<p>Kompjuter: <span>${opponentPoints}</span></p>`;        
    declareWinnerAlert (userPoints, opponentPoints , `Kompjuter`);
    userPoints = 0;
    opponentPoints = 0;
    document.querySelector('#alert-winner-bck').style.display = 'grid';
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
    clearInterval(gameTime);
    countDown = 91; 

    getWinnerSingleGame(playerForm);
    resultBackgound.style.display = 'block';  
 
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
    location.reload();
})   

//sound

sound.forEach(elem =>{
    elem.addEventListener('mouseenter', ()=>{
        let sound = new Audio ('../sounds/hover.wav');
        sound.volume = 0.2;
        sound.play();
    })
})

// pravila igre
helpHandler.forEach(elem =>{
    elem.addEventListener('click', ()=>{
        // console.log(renderHelp())
        helpModal.style.display = 'block';
        helpModal.innerHTML = renderHelp();
    })
})

helpModal.addEventListener('click', (event)=>{
    if (event.target.tagName == 'BUTTON'){
    helpModal.style.display = 'none';
    }
})







