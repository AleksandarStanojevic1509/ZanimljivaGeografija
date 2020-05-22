import {fixInputValue, alertBox, checkFirstLetter} from "./general.js"
import {hallBox, sortUsers, renderTable} from "./hallOfFame.js"
import {showModal, checkUser} from "./user.js"



const modal = document.getElementById ('modal-bck');
const modalForm = document.querySelector('#log-in form');
const inputValue = document.getElementById('username');
const switchUserHandler = document.querySelectorAll('.sync');
const addTermToDBHandler = document.querySelectorAll('.cloud-upload')
const mainFormHandler = document.getElementById('submit');
const inputText = document.getElementById('add-new-term');
const inputCategory = document.getElementById('cat-opt');
const alertModal = document.querySelector('#alert-modal-bck ');
const alertMsg = document.querySelector('#alert-modal-bck h5');
const alertTitle = document.querySelector('#alert-modal-bck h3');
const btnAlertClose = document.querySelector ('#alert button');
const btnHall = document.querySelector ('#hall button');
const hOfBtnOneHandler = document.getElementById('hall-of-fame-terms');
const hOfBox = document.getElementById('hall-modal-bck')
const hOfTable = document.querySelector ('table');
const mainFormBox = document.getElementById('main-form')
const closeMainFormHandler = document.getElementById('close')

let arrayOfUsers = []


checkUser(modalForm, inputValue, modal)

btnAlertClose.addEventListener('click', ()=>{
    alertModal.style.display = 'none';
    location.reload()
    
})

btnHall.addEventListener('click', ()=>{
    hOfBox.style.display = 'none';
    
})


addTermToDBHandler.forEach(elem=>{
    elem.addEventListener('click', ()=>{
    mainFormBox.style.display = 'grid'
    })
})

switchUserHandler.forEach(elem =>{
    elem.addEventListener('click', ()=>{
        // elem.preventDefault()
        modal.style.display = 'block';
        inputValue.value = '';
        showModal(modalForm, inputValue, modal);    
    })
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
    
    if (fixedTerm === '' && category === '' && fixedTerm === ' ' && category === ' ') return;
    ///greska!!!!

    if (localStorage.getItem('username') === null){
        alertBox(alertModal, alertMsg, alertTitle, 'Please enter username!!!', 'Oops...')
        inputText.value = '';
        inputCategory.value = '';
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
            alertBox(alertModal, alertMsg, alertTitle, 'The term already exists!!!', 'Oops...')
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
            alertBox(alertModal, alertMsg, alertTitle, 'The term added to DB!!!', 'Congrats!!!')
        }
    })
    .catch((error) => {
        console.log("Error getting document: ", error);
    });

    inputText.value = ''
    inputCategory.value = ''
    mainFormBox.style.display = 'none'
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

    closeMainFormHandler.addEventListener('click', ()=>{
        mainFormBox.style.display = 'none'

    })


    

// single player

    // // BAZA
    // db.collection("pojmovi").doc("jmXVskYFIYNXRhifanHe").delete().then(function() {
    //     console.log("Document successfully deleted!");
    // }).catch(function(error) {
    //     console.error("Error removing document: ", error);
    // });

    //  KVARNICKI 

//     let wordArray = [];
//     let words = 'Jokohama Kartum Gvajakil Hangdžou Sjamen Berlin Busan Ningbo Durban Alžir Kabul Hefej Mešhed Pjongjang Madrid Fejsalabad Baku Tangšan Ekurhuleni Najrobi Pune AdisAbaba BuenosAjres Inčon KezonSiti Kijev Salvador Dubaj Luanda Laknau Kašiung Kanpur Surabaja Tajčung Basra Toronto Tajpej Kito Čaodžou Fortaleza Čitagong Bandung Managua Brazilija BeloOrizonte';
//     wordArray = words.split(' ');
//     console.log(wordArray)
//     wordArray.forEach(word => {
//         const date = new Date();
//                db.collection('pojmovi').doc().set({
//                     kategorija: 'Grad',
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
