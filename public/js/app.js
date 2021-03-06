
// Modules
import { renderHelp } from "./general/general.js";
import { showModal, checkUser } from "./general/user.js";
import { hallBox, sortUsers, renderTable, renderBestPlayers } from "./hallOfFame/hallOfFame.js";


// DOM
//dom.user
const modal = document.getElementById('modal-bck');
const modalForm = document.querySelector('#log-in form');
const inputValue = document.getElementById('username');
const switchUserHandler = document.querySelectorAll('.sync');
const closeAlertHandler = document.querySelector('#alert-modal-bck button');
const sound = document.querySelectorAll('.hover-sound');

//dom.help
const helpHandler = document.querySelectorAll('.help');
const helpModal = document.getElementById('help-modal-bck');


//dom.hallOfFame
const btnHall = document.querySelector ('#hall button');
const hOfBtnOneHandler = document.getElementById('hall-of-fame-terms');
const hOfBtnTwoHandler = document.getElementById('hall-of-fame-score');

const hOfBox = document.getElementById('hall-modal-bck');
const hOfTable = document.querySelector ('table');


// Variables
let arrayOfUsers = [];



// log user
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
    
//     // arrayOfUsers = []    
// })


// hallOfFame.best score

// hOfBtnTwoHandler.addEventListener('click', (event) =>{
//     hallBox(hOfBox);
//     let arrayOfBestPlayers = [];
//     db.collection('rezultati')
//     .orderBy('broj_poena', 'desc')
//     .limit(5)
//     .get()
//     .then(snapshot => {
//         snapshot.docs.forEach(doc => {
//             arrayOfBestPlayers.push(doc.data());
//             // console.log();
//         });
//         return arrayOfBestPlayers
//     })
//     .then(data=>{
//         // alert(data[0].username)
//         hOfTable.innerHTML = renderBestPlayers(data);

//     })
// })
 

//sound

sound.forEach(elem =>{
    elem.addEventListener('mouseenter', ()=>{
        let sound = new Audio ('./sounds/hover.wav');
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