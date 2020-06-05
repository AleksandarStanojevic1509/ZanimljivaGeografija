import {fixInputValue, alertBox, checkFirstLetter} from "./general/general.js"
import {hallBox, sortUsers, renderTable} from "./hallOfFame/hallOfFame.js"
import {showModal, checkUser} from "./general/user.js"
import {getWinner} from "./game/singleGame.js"
import {pickRandomLetter, resetData, resetScoreTable, declareWinnerAlert, collectPlayerAnswers} from './game/game.js'
import {addTerm} from "./general/addTerm.js"
import {writeEvent} from './game/multiGame.js'
// import {collectPlayerAnswers} from './game/game.js'

const modal = document.getElementById ('modal-bck');
const modalForm = document.querySelector('#log-in form');
const inputValue = document.getElementById('username');
const switchUserHandler = document.querySelectorAll('.sync');
const addTermToDBHandler = document.querySelectorAll('.cloud-upload')
const inputText = document.getElementById('add-new-term');
const inputCategory = document.getElementById('cat-opt');
const alertModal = document.querySelector('#alert-modal-bck');
const alertMsg = document.querySelector('#alert-modal-bck h5');
const alertTitle = document.querySelector('#alert-modal-bck h3');
const btnAlertClose = document.querySelector ('#alert button');
const btnHall = document.querySelector ('#hall button');
const hOfBtnOneHandler = document.getElementById('hall-of-fame-terms');
const hOfBox = document.getElementById('hall-modal-bck');
const hOfTable = document.querySelector ('table');
const addTermForm = document.getElementById('add-term-form');
const addTermHandler = document.getElementById('submit');
const closeAddTermHandler = document.getElementById('close');
const gifBox = document.getElementById('gif-bck');
// singleGame
const alertWinnerModal = document.querySelector('#alert-winner-bck');
const closeResultHandler = document.getElementById('close-res');
const resultBackgound = document.getElementById('result-bck')
const userAnswersBox = document.getElementById('game-bck');
const singleGameSubmitBtn = document.querySelector('#game-answers button');
const singleGameHandelr = document.querySelectorAll('.play-game-single');
const playerForm = document.querySelector('#game-answers form');
const resetGame = document.querySelector('#result button')
const finalScore = document.getElementById('score')
const resultTable = document.querySelector('#result-body')

// multiGame

const multiGameHandler = document.querySelectorAll('.play-game-multi');
const multiGameInputBox = document.getElementById('game-multi-bck')
const chatHanler = document.querySelector('#ctrl-chat button')
const multiAnswersForm = document.querySelector('#game-multi-input button')



let arrayOfUsers = [];
let gameTime;
// let opponentAnswers = [];

                                        // ALERTS - MODALS

btnAlertClose.addEventListener('click', ()=>{
    alertModal.style.display = 'none';
    location.reload();    
})

                                        // LOG USER

checkUser(modalForm, inputValue, modal);

switchUserHandler.forEach(elem =>{
    elem.addEventListener('click', ()=>{
        modal.style.display = 'block';
        inputValue.value = '';
        showModal(modalForm, inputValue, modal);    
    })
})

                                        // HALL OF FAME (TERMS)

// trenutno onemoguceno !!!!!
// hOfBtnOneHandler.addEventListener('click', ()=>{
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

// // close modal
// btnHall.addEventListener('click', ()=>{
//     hOfBox.style.display = 'none';
//     arrayOfUsers = []    
// })

                                        // ADD NEW TERMS

addTermToDBHandler.forEach(elem=>{
    elem.addEventListener('click', ()=>{
    gifBox.style.display = 'none';
    addTermForm.style.display = 'grid';
    })
})

// adding new term to db
addTermHandler.addEventListener('click', (event)=>{
    event.preventDefault();
    
    const fixedTerm = fixInputValue (inputText); 
    const category = inputCategory.value;
    
    if (fixedTerm === '' && category === '' && fixedTerm === ' ' && category === ' ') return;

    if (localStorage.getItem('username') === null){
        alertBox(alertModal, alertMsg, alertTitle, 'Please enter username!!!', 'Oops...');
        addTermForm.reset();
        return;
    }

    const firstLetter = checkFirstLetter(fixedTerm);   
    
    addTerm(fixedTerm, firstLetter, category, inputCategory, alertModal, alertMsg, alertTitle);
    
    addTermForm.reset();
    addTermForm.style.display = 'none';
})


// close add modal
closeAddTermHandler.addEventListener('click', ()=>{
    addTermForm.style.display = 'none';
})

                                        // SINGLE GAME MODE

// start with game
let countDown = 61;

singleGameHandelr.forEach(elem=>{
    elem.addEventListener('click', ()=>{
        userAnswersBox.style.display = 'grid';

        // pick random letter
        let letter = pickRandomLetter();
        // let letter = 'Nj';
        localStorage.setItem('randomLetter', `${letter}`)
        document.getElementById('random-letter').innerHTML  = letter;  

        // countDown Time
        timer()
    })    
})

//submit answers
singleGameSubmitBtn.addEventListener('click', (event)=>{
    event.preventDefault();   

    getWinner (playerForm)
    resultBackgound.style.display = 'block'
   
    // reset countDown Time 

    resetData(userAnswersBox, playerForm);
    clearInterval(gameTime);
    countDown = 61; 
})
    
    
    
// close result box
closeResultHandler.addEventListener('click', ()=>{
    resultBackgound.style.display = 'none';
})

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
    // resetScoreTable(resultTable)
    // finalScore.children[0].innerHTML = `<p>${localStorage.username}: <span>0</span></p>`;
    // finalScore.children[1].innerHTML = `<p>Kompjuter: <span>0</span></p>`;

    userAnswersBox.style.display = 'grid';
    // pick random letter
    let letter = pickRandomLetter();
    localStorage.setItem('randomLetter', `${letter}`)
    document.getElementById('random-letter').innerHTML  = letter;  
    // countDown Time     
    timer()
})   



                                        // MULTI GAME MODE



chatHanler.addEventListener('click', (event)=>{
    const sock = io()
    event.preventDefault()
    let inputText = document.querySelector('#ctrl-chat input')
    let text = inputText.value
    // writeEvent(text)
    inputText.value = ''    
    sock.emit('message', text)
})

multiGameHandler.forEach(elem=>{
    elem.addEventListener('click', ()=>{
        const sock = io()
        sock.on('message', writeEvent)        
        multiGameInputBox.style.display = 'grid'        
       
    })


    
})

multiAnswersForm.addEventListener('click', (event)=>{
    const sock = io()
    event.preventDefault()
    const formAnswers = document.querySelector('#game-multi-input form')
    let playerAnswers = collectPlayerAnswers(formAnswers)
    console.log(playerAnswers)
    sock.emit('answers', playerAnswers) 
    formAnswers.reset()

})

// Timer

function timer () {
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

