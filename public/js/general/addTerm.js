
import { fixInputValue, alertBox, checkFirstLetter, renderHelp } from "./general.js";

//dom.add term to DB
const inputText = document.getElementById('add-new-term');
const inputCategory = document.getElementById('cat-opt');
const addTermForm = document.getElementById('add-term-form');
const addTermHandler = document.getElementById('submit');
const alertModal = document.querySelector('#alert-modal-bck');
const alertMsg = document.querySelector('#alert-modal-bck h5');
const alertTitle = document.querySelector('#alert-modal-bck h3');
const btnAlertClose = document.querySelector ('#alert button');
const sound = document.querySelectorAll('.hover-sound-t');


//dom.help
const helpHandler = document.querySelectorAll('.help');
const helpModal = document.getElementById('help-modal-bck');

// variable
const soundWinner = new Audio ('../sounds/winner.mp3');
const soundTie = new Audio ('../sounds/tie.mp3');


const addTerm = (fixedTerm, firstLetter, category, alertModal, alertMsg, alertTitle) =>{

    db.collection("pojmovi")
    .where("pojam", "==", `${fixedTerm}`)
    .where("kategorija", "==", `${category}`)
    .where("pocetnoSlovo","==", `${firstLetter}`)
    .get()
    .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
            querySnapshot.docs.forEach((doc) => {
            soundTie.play();
            alertBox(alertModal, alertMsg, alertTitle, 'Termin već postoji!!!', 'Oops...');
            }) 
        }
        else {
            // console.log('nema u kolekciji ')
            // db.collection("predlozi")
            // .where("pojam", "==", `${fixedTerm}`)
            // .where("kategorija", "==", `${category}`)
            // .where("pocetnoSlovo","==", `${firstLetter}`)
            // .get()
            // .then((querySnapshot) => {
            //     if (querySnapshot.size > 0) {
            //         querySnapshot.docs.forEach((doc) => {
            //             console.log(doc)
            //         alertBox(alertModal, alertMsg, alertTitle, 'Termin je već predložen!!!', 'Oops...');
            //         console.log('ima u kolekciji predlozrni')
            //         }) 
            //     }
            //     else {        
            //         console.log('tada')
            //         const date = new Date();
            //         db.collection('predlozi').doc().set({
            //             kategorija: category,
            //             korisnik: localStorage.getItem('username'),
            //             pocetnoSlovo: firstLetter,
            //             pojam:fixedTerm,
            //             vreme:firebase.firestore.Timestamp.fromDate(date)
            //         })
            //         alertBox(alertModal, alertMsg, alertTitle, 'Termin je predložen!!!', 'Čestitamo!!!');
            //     }
            // })
        
            const date = new Date();
            db.collection('predlozi').doc().set({
                kategorija: category,
                korisnik: localStorage.getItem('username'),
                pocetnoSlovo: firstLetter,
                pojam:fixedTerm,
                vreme:firebase.firestore.Timestamp.fromDate(date)
            })
            soundWinner.play();
            alertBox(alertModal, alertMsg, alertTitle, 'Termin je predložen!!!', 'Čestitamo!!!');

        }
    })
    .catch((error) => {
        alertBox(alertModal, alertMsg, alertTitle, 'Sorry, we have too many requests, please try later!', 'Oops!!!');
    });
    
}

// add term
addTermHandler.addEventListener('click', (event)=>{
    event.preventDefault();
    
    if (inputCategory.value === 'Izaberi kategoriju...') return;
    if (inputText.value === '' || inputCategory.value === '' || inputText.value === ' ' || inputCategory.value === ' ') return ;

    const fixedTerm = fixInputValue (inputText); 
    const category = inputCategory.value;
    

    if (localStorage.getItem('username') === null){
        alertBox(alertModal, alertMsg, alertTitle, 'Unesite korisničko ime!!!', 'Oops...');
        addTermForm.reset();
        return;
    }

    const firstLetter = checkFirstLetter(fixedTerm);   
    
    addTerm(fixedTerm, firstLetter, category, alertModal, alertMsg, alertTitle);
    
    addTermForm.reset();

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
        helpModal.style.display = 'block';
        helpModal.innerHTML = renderHelp();
    })
})

helpModal.addEventListener('click', (event)=>{
    if (event.target.tagName == 'BUTTON'){
    helpModal.style.display = 'none';
    }
})