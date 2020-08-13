
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

//dom.help
const helpHandler = document.querySelectorAll('.help');
const helpModal = document.getElementById('help-modal-bck');


const addTerm = (fixedTerm, firstLetter, category, inputCategory, alertModal, alertMsg, alertTitle) =>{

    db.collection("pojmovi")
    .where("pojam", "==", `${fixedTerm}`)
    .where("kategorija", "==", `${inputCategory.value}`)
    .where("pocetnoSlovo","==", `${firstLetter}`)
    .get()
    .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
            querySnapshot.docs.forEach((doc) => {
            alertBox(alertModal, alertMsg, alertTitle, 'Termin već postoji!!!', 'Oops...');
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
            alertBox(alertModal, alertMsg, alertTitle, 'Termin uspešno unet u DB!!!', 'Čestitamo!!!');
        }
    })
    .catch((error) => {
        alertBox(alertModal, alertMsg, alertTitle, 'Sorry, we have too many requests, please try later!', 'Oops!!!');
    });
    
}

// add term
addTermHandler.addEventListener('click', (event)=>{
    event.preventDefault();
    
    const fixedTerm = fixInputValue (inputText); 
    const category = inputCategory.value;
    
    if (fixedTerm.value === '' && category === '' && fixedTerm.value === ' ' && category === ' ') return ;

    if (localStorage.getItem('username') === null){
        alertBox(alertModal, alertMsg, alertTitle, 'Unesite korisničko ime!!!', 'Oops...');
        addTermForm.reset();
        return;
    }

    const firstLetter = checkFirstLetter(fixedTerm);   
    
    addTerm(fixedTerm, firstLetter, category, inputCategory, alertModal, alertMsg, alertTitle);
    
    addTermForm.reset();

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