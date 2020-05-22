import {fixInputValue, alertBox, checkFirstLetter} from "./general.js"
import {hallBox, sortUsers, renderTable} from "./hallOfFame.js"
import {showModal, checkUser} from "./user.js"



const modal = document.getElementById ('modal-bck');
const modalForm = document.querySelector('#log-in form');
const inputValue = document.getElementById('username');
const switchUser = document.querySelector('header i');
const mainFormHandler = document.getElementById('submit');
const inputText = document.getElementById('add-new-term');
const inputCategory = document.getElementById('cat-opt');
const alertModal = document.querySelector('#alert-modal-bck ');
const alertMsg = document.querySelector('#alert-modal-bck h5');
const alertTitle = document.querySelector('#alert-modal-bck h3');
const btnAlert = document.querySelector ('#alert button');
const btnHall = document.querySelector ('#hall button');
const hOfBtnOneHandler = document.getElementById('hall-of-fame-first');
const hOfBox = document.getElementById('hall-modal-bck')
const hOfTable = document.querySelector ('table');

let arrayOfUsers = []


checkUser(modalForm, inputValue, modal)

btnAlert.addEventListener('click', ()=>{
    alertModal.style.display = 'none';
    
})

btnHall.addEventListener('click', ()=>{
    hOfBox.style.display = 'none';
    
})

switchUser.addEventListener('click', ()=>{
    modal.style.display = 'block';
    inputValue.value = '';
    showModal(modalForm, inputValue, modal);    
})

hOfBtnOneHandler.addEventListener('click', ()=>{
    console.log('hall')
    hallBox(hOfBox)
})

// Unos podataka u bazu

mainFormHandler.addEventListener('click', (event)=>{
    event.preventDefault();
    const fixedTerm = fixInputValue (inputText); 
    const category = inputCategory.value;
    
    if (fixedTerm === '' && category === '') return;

    if (localStorage.getItem('username') === null){
        alertBox(alertModal, alertMsg, alertTitle, 'Please ender username!!!', 'Oops...')
        inputText.value = '';
        inputCategory.value = '';
        return;
    }

    let firstLetter = checkFirstLetter(fixedTerm) 

    db.collection("pojmovi")
    .where("pojam", "==", `${fixedTerm}`)
    .get()
    .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
            querySnapshot.docs.forEach((doc) => {
            alertBox(alertModal, alertMsg, alertTitle, 'Term is already exist!!!', 'Oops...')
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
            alertBox(alertModal, alertMsg, alertTitle, 'Term added to DB!!!', 'Congrats!!!')
        }
    })
    .catch((error) => {
        console.log("Error getting document: ", error);
    });
    inputText.value = ''
    inputCategory.value = ''
    })

    // Rangiranje usera po broju unosa
    
    db.collection('pojmovi').get()
    .then(data=>{
        data.docs.forEach(doc=>{
            arrayOfUsers.push(doc.data().korisnik)
            console.log(doc.id, " => ", doc.data());
        })
        
        let sortedArray = sortUsers (arrayOfUsers);
        
        hOfTable.innerHTML = renderTable(sortedArray);
        
    })
    

    // BAZA
    db.collection("pojmovi").doc("jmXVskYFIYNXRhifanHe").delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    