// module
import { collectPlayerAnswers, declareWinner } from "./game.js";
import { checkFirstLetter, renderHelp } from "../general/general.js";
import { addScore } from "../general/addScore.js";


//DOM
const multiGameHandler = document.querySelectorAll('.play-game-multi');
const chatHanler = document.querySelector('#ctrl-chat button');
const multiAnswersForm = document.querySelector('#game-multi-input button');
const resultTable = document.querySelector('#result-body');
const finalScore = document.getElementById('score');
const userNameTable = document.getElementById('username-table');
const opponentNameTable = document.getElementById('opponent-table');
const alertWinnerModal = document.getElementById('alert-winner-bck');
const resetGame = document.querySelector('#result button');

//dom.help
const helpHandler = document.querySelectorAll('.help');
const helpModal = document.getElementById('help-modal-bck');


// Variables
let gameTime;
let countDown = 61;
const category = ["Država", "Grad", "Reka", "Planina", "Životinja", "Biljka", "Predmet"];
const sock = io();
let user = localStorage.getItem('username');
let userPoints = 0;
let opponentPoints = 0;


// function
// function.write event from soket
const writeEvent = (text) =>{
    const parent = document.querySelector ('#display-chat ul')
    const el =  document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
    document.getElementById('display-chat').scrollTop = document.getElementById('display-chat').scrollHeight;
}

// function.create timer
const multiPlayerTimer = () => {
    gameTime = setInterval( () => {
        if(countDown === 0){
            window.scrollTo(0, 0);
            const formAnswers = document.querySelector('#game-multi-input form');

            let playerAnswers = collectPlayerAnswers(formAnswers);
            sock.emit('answers', playerAnswers) ;
            clearInterval(gameTime);
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


// function.get winer
const getWinner = (answers) =>{
    let answersArr = [];
    category.forEach((elem,index)=>{
        db.collection("pojmovi")
        .where("kategorija", "==", `${elem}`)
        .where("pojam", "==", `${answers[0][index]}`)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                answersArr.push(answers[0][index])
            }            
            else{
                answersArr.push('')
            }
            return  answersArr
        })
        .then((data)=>{
            let obj = {answ:{
                    name:user,
                    arrAns:data
                }}
        if(obj.answ.arrAns.length == 7){
            sock.emit('result', obj)
        }
        })
    })
}


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


// const checkOpponent = (local, opp, usr) =>{
//     let opponent;
//     if(local === usr){
//         opponent = opp;
//     }
//     else {
//         opponent = usr;
//     }
//     return opponent;
// }

const renderResult = (data) =>{
    category.forEach((elem, index)=>{
        switch(elem){
            case "Država":
                addPoints(data[0].answ.arrAns[index], data[1].answ.arrAns[index], resultTable.children[index].children[1], resultTable.children[index].children[2], resultTable.children[index].children[3], resultTable.children[index].children[4])
                break;
            case "Grad":
                addPoints(data[0].answ.arrAns[index], data[1].answ.arrAns[index], resultTable.children[index].children[1], resultTable.children[index].children[2], resultTable.children[index].children[3], resultTable.children[index].children[4])
                break;
            case "Reka":
                addPoints(data[0].answ.arrAns[index], data[1].answ.arrAns[index], resultTable.children[index].children[1], resultTable.children[index].children[2], resultTable.children[index].children[3], resultTable.children[index].children[4])
                break;
            case "Planina":
                addPoints(data[0].answ.arrAns[index], data[1].answ.arrAns[index], resultTable.children[index].children[1], resultTable.children[index].children[2], resultTable.children[index].children[3], resultTable.children[index].children[4])
                break;
            case "Životinja":
                addPoints(data[0].answ.arrAns[index], data[1].answ.arrAns[index], resultTable.children[index].children[1], resultTable.children[index].children[2], resultTable.children[index].children[3], resultTable.children[index].children[4])
                break;
            case "Biljka":
                addPoints(data[0].answ.arrAns[index], data[1].answ.arrAns[index], resultTable.children[index].children[1], resultTable.children[index].children[2], resultTable.children[index].children[3], resultTable.children[index].children[4])
                break;
            case "Predmet":
                addPoints(data[0].answ.arrAns[index], data[1].answ.arrAns[index], resultTable.children[index].children[1], resultTable.children[index].children[2], resultTable.children[index].children[3], resultTable.children[index].children[4])
                break;
        }
    
        finalScore.children[0].innerHTML = `<p>${data[0].answ.name}: <span>${userPoints}</span></p>`;
        finalScore.children[1].innerHTML = `<p>${data[1].answ.name}: <span>${opponentPoints}</span></p>`;
        if(elem === "Predmet"){
            declareWinner(userPoints, opponentPoints, data[0].answ.name, data[1].answ.name );            
        }
        alertWinnerModal.style.display = 'grid';
        userNameTable.innerHTML = data[0].answ.name;
        opponentNameTable.innerHTML = data[1].answ.name;
        })    
        let scores = [
            {name:data[0].answ.name, points:userPoints},
            {name:data[1].answ.name, points:opponentPoints}
        ]
        console.log(scores)
        if(localStorage.getItem('username') === scores[0].name){
            // console.log('rezultati za ' + localStorage.getItem('username') + ' su ' + scores[0].points)
            new addScore(localStorage.getItem('username'), scores[0].points);
        }
        else{
            // console.log('rezultati za ' + localStorage.getItem('username') + ' su ' + scores[1].points)
            new addScore(localStorage.getItem('username'), scores[1].points);
        }
        document.getElementById('result-bck').style.display = 'grid';

}



// Listeners
// listeners.socket
sock.on('chat', writeEvent);
sock.on('message', writeEvent);                
sock.on('start', multiPlayerTimer);
sock.on('sendAnswers', getWinner);
sock.on('answersForRender', renderResult);
sock.on('letter',  (letter) =>{
    document.getElementById('random-letter-multi').innerHTML  = letter;
})

// listeners.chat
chatHanler.addEventListener('click', (event)=>{
    event.preventDefault();

    let inputText = document.querySelector('#ctrl-chat input');
    let text = inputText.value;
    inputText.value = '';    

    sock.emit('chat', `<span style="font-weight: 700;font-style: italic;color: brown;">${localStorage.username}</span>  =>  ${text}`);    
})

// submit answers
multiAnswersForm.addEventListener('click', (event)=>{
    event.preventDefault();
    window.scrollTo(0, 0);
    const formAnswers = document.querySelector('#game-multi-input form')

    let playerAnswers = collectPlayerAnswers(formAnswers)
    sock.emit('answers', playerAnswers) 
    clearInterval(gameTime);

})


// alert with winner and socore
alertWinnerModal.addEventListener('click', event => {
    event.stopPropagation();
    if (event.target.tagName === 'BUTTON'){
        alertWinnerModal.style.display = 'none';
    }
})

// reset game
resetGame.addEventListener('click', ()=>{
    location.reload();
})   

// show chat
const chatHandler = document.getElementById('chat-icon');
chatHandler.addEventListener('click', ()=>{
    closeChatHandler.style.display = 'block';
    chatHandler.style.display = 'none';
    document.getElementById('game-multi-chat').style.display = 'flex';
})
// hide chat
const closeChatHandler = document.getElementById('close-chat');
closeChatHandler.addEventListener('click', ()=>{
    closeChatHandler.style.display = 'none';
    chatHandler.style.display = 'flex';
    document.getElementById('game-multi-chat').style.display = 'none';

})

// pravila igre
helpHandler.forEach(elem =>{
    elem.addEventListener('click', ()=>{
        helpModal.style.display = 'block';
        helpModal.innerHTML = renderHelp();
    })
})

helpModal.addEventListener('click', (event)=>{
    if (event.target.tagName == 'BUTTON'){
    helpModal.style.display = 'none';
    }
})