import {fixInputValue, alertBox, checkFirstLetter, pickRandomLetter, resetData} from "./general.js"
import {hallBox, sortUsers, renderTable} from "./hallOfFame.js"
import {showModal, checkUser} from "./user.js"
import {getWinner} from "./singleGame.js"

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
// playGame
const alertWinnerModal = document.querySelector('#alert-winner-bck');
const closeResultHandler = document.getElementById('close-res');
const resultBackgound = document.getElementById('result-bck')
const userAnswersBox = document.getElementById('game-bck');
const singleGameSubmitBtn = document.querySelector('#game-answers button');
const singleGameHandelr = document.querySelectorAll('.play-game-single');
// const multiGameHandelr = document.querySelectorAll('.play-game-multi');
const playerForm = document.querySelector('#game-answers form');
const resetGame = document.querySelector('#result button')


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

// close modal
btnHall.addEventListener('click', ()=>{
    hOfBox.style.display = 'none';
    
})

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
    let firstLetter = checkFirstLetter(fixedTerm);
    
    db.collection("pojmovi")
    .where("pojam", "==", `${fixedTerm}`)
    .where("kategorija", "==", `${inputCategory.value}`)
    .where("pocetnoSlovo","==", `${firstLetter}`)
    .get()
    .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
            querySnapshot.docs.forEach((doc) => {
            alertBox(alertModal, alertMsg, alertTitle, 'The term already exists!!!', 'Oops...');
        }) 
    }
    else {
            const date = new Date();
            db.collection('pojmovi').doc().set({
                kategorija: category,
                korisnik: localStorage.getItem('username'),
                pocetnoSlovo: firstLetter,
                pojam:fixedTerm,
                vreme:firebase.firestore.Timestamp.fromDate(date)
            })
            alertBox(alertModal, alertMsg, alertTitle, 'The term added to DB!!!', 'Congrats!!!');
        }
    })
    .catch((error) => {
        alertBox(alertModal, alertMsg, alertTitle, 'Sorry, we have too many requests, please try later!', 'Oops!!!');
    });
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
        localStorage.setItem('randomLetter', `${letter}`)
        document.getElementById('random-letter').innerHTML  = letter;  

        // countDown Time 
        
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
                    document.getElementById('time-to-end').innerHTML = `<span style="color:red">${sec}<span>`;
                }
                else{
                    document.getElementById('time-to-end').innerHTML = `<span style="color:black">${sec}<span>`;
                }
            }
        }, 1000);
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

    userAnswersBox.style.display = 'grid';
    // pick random letter
    let letter = pickRandomLetter();
    localStorage.setItem('randomLetter', `${letter}`)
    document.getElementById('random-letter').innerHTML  = letter;  

    // countDown Time     
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
            document.getElementById('time-to-end').innerHTML = `<span style="color:red">${sec}<span>`;
        }
        else{
            document.getElementById('time-to-end').innerHTML = `<span style="color:black">${sec}<span>`;
        }
    }
}, 1000);
})   



// BAZA
// db.collection("pojmovi").doc("2XDElWysqCuBQsGKHZI3").delete().then(function() {
    //     console.log("Document successfully deleted!");
    // }).catch(function(error) {
        //     console.error("Error removing document: ", error);
        // });
        
    //  KVARNICKI 
    
//         let wordArray = [];
//     let words = 'Antilopa Ajkula Ara Albatros Bizon Bivo Babun Boa Cvrčak Cipal Carić Čikov Činčila Čavka Čaplja Ćurka Ćuk Deverika Detlić Drozd Dabar Džeksonovkameleon Džofrijevocelot Đavoljaraža Đavoljizubošaranaš Emu Eja Flamingo Fugu Fratar Foka Galeb Gavran Grgeč Grdoba Haringa Harpija Hrčak Hijena Irvas Ibis Iverak Jazavac Jegulja Jež Jesetra Klen Karaš Kolibri Kuna Lav Lemur Lasta Losos Ljiljak Medved Muflon Makaki Moruna Noj Nosorog Nutrija Njorka Oslić Orao Okapi Puma Panda Pauk Prepelica Rak Roda Raža Ris Som Smuđ Sova Soko Ševa Šljuka Šaran Šakal Tigar Tvor Tuna Tetreb Uholaže Ulješara Utva Veverica Valabi Varan Vaška Zebra Zeba Zec Ždral Žaba Žderavac';
//     wordArray = words.split(' ');
//     console.log(wordArray)
//     wordArray.forEach(word => {
//         const date = new Date();
//                db.collection('pojmovi').doc().set({
//                    kategorija: 'Životinja',
//                    korisnik: localStorage.getItem('username'),
//                    pocetnoSlovo: word.slice(0,1).toUpperCase(),
//                    pojam:word,
//                    vreme:firebase.firestore.Timestamp.fromDate(date)
//                })
       
//    })

// BRISANJE SVIH PODATAKA JEDNOG USERA
// db.collection("pojmovi")
//     .where("korisnik", "==", 'alexStan')
//     .get()
//     .then( snapshot => {
//         snapshot.docs.forEach( doc => {
//             db.collection('pojmovi').doc(doc.id).delete();
//         })
//     });



