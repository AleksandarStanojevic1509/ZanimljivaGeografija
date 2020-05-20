import {showModal, fixInputValue, checkUser, alertBox} from "./module.js"

const modal = document.getElementById ('modal-bck');
const modalForm = document.querySelector('#log-in form');
const inputValue = document.getElementById('username');
const switchUser = document.querySelector('header i');
const mainFormHandler = document.getElementById('submit');
const inputText = document.getElementById('add-new-term');
const inputCategory = document.getElementById('cat-opt');
const closeBtn = document.getElementById('close')
const alertModal = document.querySelector('#alert-modal-bck ')
const alertMsg = document.querySelector('#alert-modal-bck h5')
const btn = document.querySelector ('#alert button')




        
checkUser(modalForm, inputValue, modal)

btn.addEventListener('click', ()=>{
    alertModal.style.display = 'none';

})

switchUser.addEventListener('click', ()=>{
    modal.style.display = 'block';
    inputValue.value = '';
    showModal(modalForm, inputValue, modal);    
})

closeBtn.addEventListener('click', ()=>{
    modal.style.display = 'none';
})



mainFormHandler.addEventListener('click', (event)=>{
    event.preventDefault();
    const fixedTerm = fixInputValue (inputText); 
    const category = inputCategory.value;  
    console.log(fixedTerm, category);

    db.collection("pojmovi")
    .where("pojam", "==", `${fixedTerm}`)
    .get()
    .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
        querySnapshot.docs.forEach((doc) => {
            alertBox(alertModal, alertMsg, 'Term is already exist!!!')
        }) 
        } 
        else {
            const date = new Date();
            db.collection('pojmovi').doc().set({
                kategorija: category,
                korisnik: localStorage.getItem('username'),
                pocetnoSLovo: fixedTerm.slice(0,1),
                pojam:fixedTerm,
                vreme:firebase.firestore.Timestamp.fromDate(date)
            })
            alertBox(alertModal, alertMsg, 'Term added to DB!!!')
        }
      })
      .catch((error) => {
        console.log("Error getting document: ", error);
      });
      console.log('aaa')
      inputText.value = ''
      inputCategory.value = ''
})
