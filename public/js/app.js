// import {getWinner} from "./game/singleGame.js"
// import {pickRandomLetter, resetData, collectPlayerAnswers} from './game/game.js'
// import {writeEvent} from './game/multiGame.js'







// // singleGame
// const alertWinnerModal = document.querySelector('#alert-winner-bck');
// const closeResultHandler = document.getElementById('close-res');
// const resultBackgound = document.getElementById('result-bck')
// const userAnswersBox = document.getElementById('game-bck');
// const singleGameSubmitBtn = document.querySelector('#game-answers button');
// const singleGameHandelr = document.querySelectorAll('.play-game-single');
// const playerForm = document.querySelector('#game-answers form');
// const resetGame = document.querySelector('#result button')
// const finalScore = document.getElementById('score')
// const resultTable = document.querySelector('#result-body')

// // multiGame

// const multiGameHandler = document.querySelectorAll('.play-game-multi');
// const multiGameInputBox = document.getElementById('game-multi-bck')
// const chatHanler = document.querySelector('#ctrl-chat button')
// const multiAnswersForm = document.querySelector('#game-multi-input button')



let arrayOfUsers = [];
// let gameTime;
// let opponentAnswers = [];

                                        // ALERTS - MODALS

// btnAlertClose.addEventListener('click', ()=>{
//     alertModal.style.display = 'none';
//     location.reload();    
// })







//                                         // SINGLE GAME MODE

// // start with game
// let countDown = 20;

// singleGameHandelr.forEach(elem=>{
//     elem.addEventListener('click', ()=>{
//         userAnswersBox.style.display = 'grid';

//         // pick random letter
//         let letter = pickRandomLetter();
//         // let letter = 'Nj';
//         localStorage.setItem('randomLetter', `${letter}`)
//         document.getElementById('random-letter').innerHTML  = letter;  

//         // countDown Time
//         singlPlayerTimer()
//     })    
// })

// //submit answers
// singleGameSubmitBtn.addEventListener('click', (event)=>{
//     event.preventDefault();   

//     getWinner (playerForm)
//     resultBackgound.style.display = 'block'
   
//     // reset countDown Time 

//     resetData(userAnswersBox, playerForm);
//     clearInterval(gameTime);
//     countDown = 61; 
// })
    
    
    
// // close result box
// closeResultHandler.addEventListener('click', ()=>{
//     resultBackgound.style.display = 'none';
// })

// // alert with winner and socore
// alertWinnerModal.addEventListener('click', event => {
//     event.stopPropagation()
//     if (event.target.tagName === 'BUTTON'){
//         alertWinnerModal.style.display = 'none'
//     }

// })

// // reset game
// resetGame.addEventListener('click', ()=>{
//     resultBackgound.style.display = 'none'
//     // resetScoreTable(resultTable)
//     // finalScore.children[0].innerHTML = `<p>${localStorage.username}: <span>0</span></p>`;
//     // finalScore.children[1].innerHTML = `<p>Kompjuter: <span>0</span></p>`;

//     userAnswersBox.style.display = 'grid';
//     // pick random letter
//     let letter = pickRandomLetter();
//     localStorage.setItem('randomLetter', `${letter}`)
//     document.getElementById('random-letter').innerHTML  = letter;  
//     // countDown Time     
//     singlPlayerTimer()
// })   



//                                         // MULTI GAME MODE
// // const sock = io()


// chatHanler.addEventListener('click', (event)=>{
//     event.preventDefault();

//     const sock = io()
//     // sock.on('start', gameStartsIn)

//     let inputText = document.querySelector('#ctrl-chat input');
//     let text = inputText.value;
//     // console.log(text)
//     // writeEvent(text)
//     inputText.value = ''    
//     sock.emit('chat', `<span style="font-weight: 700;font-style: italic;color: brown;">${localStorage.username}</span> => ${text}`)
// })



// multiGameHandler.forEach(elem=>{
//     elem.addEventListener('click', ()=>{
//         const sock = io();
//         sock.on('message', writeEvent);
                
//         sock.on('letter',  (letter) =>{
//             document.getElementById('random-letter-multi').innerHTML  = letter;
//         })

//         sock.on('start', multiPlayerTimer) 

//         multiGameInputBox.style.display = 'grid'        
        
//         sock.emit('username', localStorage.username) // ???
//     })
// })

// multiAnswersForm.addEventListener('click', (event)=>{
//     // const sock = io()
//     event.preventDefault()
//     const formAnswers = document.querySelector('#game-multi-input form')
//     let playerAnswers = collectPlayerAnswers(formAnswers)
//     console.log(playerAnswers)
//     sock.emit('answers', playerAnswers) 
//     // formAnswers.reset()
//     console.log('PREKID')
//     clearInterval(gameTime);
    
// })

// // sock.on('chat', writeEvent)



// Timeri

function singlPlayerTimer () {
    gameTime = setInterval( () => {
        if(countDown === 0){
            // submituj formu i proglasi pobednika

            getWinner(playerForm)
            resultBackgound.style.display = 'block'
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

function multiPlayerTimer () {
    gameTime = setInterval( () => {
        if(countDown === 0){
            // submituj formu i proglasi pobednika

            // getWinner(playerForm)
            // resultBackgound.style.display = 'block'
            // reset countDown Time 
            clearInterval(gameTime);
            countDown = 61;
            // resetData(userAnswersBox, playerForm);
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




// let gameStartsIn = () => {

//     let counter = 4
//     // let timeleft = 4;
//     let timer = setInterval(() => {
//         counter -= 1;
//         document.getElementById('count-bck').style.display = 'block'
//         document.querySelector('#count-bck p').innerHTML = `Igra počinje za ${counter}`
//         // ukoliko dodje do nule klikni na dugme vezano za formu
//         if (counter == 0) {
//             document.getElementById('count-bck').style.display = 'none'
//             clearInterval(timer);
//             document.querySelector('#count-bck p').innerHTML = ''
//         }
//     }, 1000);
//     sock.emit('username', localStorage.prsUser)

// }


// sa servera this.sendStart(true)








// //////////////////////////////////////POCETAKKKKK

// Modules
import { renderHelp } from "./general/general.js";
import {showModal, checkUser} from "./general/user.js";
import {hallBox, sortUsers, renderTable} from "./hallOfFame/hallOfFame.js";


// DOM
//dom.user
const modal = document.getElementById('modal-bck');
const modalForm = document.querySelector('#log-in form');
const inputValue = document.getElementById('username');
const switchUserHandler = document.querySelectorAll('.sync');
const closeAlertHandler = document.querySelector('#alert-modal-bck button');

//dom.help
const helpHandler = document.querySelectorAll('.help');
const helpModal = document.getElementById('help-modal-bck');



//hallOfFame.term

const btnHall = document.querySelector ('#hall button');
const hOfBtnOneHandler = document.getElementById('hall-of-fame-terms');
const hOfBox = document.getElementById('hall-modal-bck');
const hOfTable = document.querySelector ('table');




//                                         LOG USER

checkUser(modalForm, inputValue, modal);

// Listeners
    
// user.switch user
switchUserHandler.forEach(elem =>{
    elem.addEventListener('click', ()=>{
        modal.style.display = 'block';
        inputValue.value = '';
        showModal(modalForm, inputValue, modal);    
    })
})

// user.close log user alert
closeAlertHandler.addEventListener('click', ()=>{
    document.getElementById('alert-modal-bck').style.display = 'none';
})



//hallOfFame.terms

// trenutno onemoguceno !!!!!

// hOfBtnOneHandler.addEventListener('click', ()=>{
//     console.log('test iz hofa')
//     hallBox(hOfBox);

//     // render hall of fame
//     db.collection('pojmovi').get()
//     .then(data=>{
//         data.docs.forEach(doc=>{
//             arrayOfUsers.push(doc.data().korisnik);
//             // console.log(doc.id, " => ", doc.data());
//         })
//         let sortedArray = sortUsers (arrayOfUsers);        
//         hOfTable.innerHTML = renderTable(sortedArray);        
//     })
// })

// close modal
// btnHall.addEventListener('click', ()=>{
//     hOfBox.style.display = 'none';
//     arrayOfUsers = []    
// })


// pravila igre
helpHandler.forEach(elem =>{
    elem.addEventListener('click', ()=>{
        // console.log(renderHelp())
        helpModal.style.display = 'block';
        helpModal.innerHTML = renderHelp()
    })
})

helpModal.addEventListener('click', (event)=>{
    if (event.target.tagName == 'BUTTON'){
    helpModal.style.display = 'none';
    }
})