import {showModal, fixInputValue, checkUser, alertBox, hallBox, checkFirstLetter} from "./module.js"

const modal = document.getElementById ('modal-bck');
const modalForm = document.querySelector('#log-in form');
const inputValue = document.getElementById('username');
const switchUser = document.querySelector('header i');
const mainFormHandler = document.getElementById('submit');
const inputText = document.getElementById('add-new-term');
const inputCategory = document.getElementById('cat-opt');
// const closeBtn = document.getElementById('close');
const alertModal = document.querySelector('#alert-modal-bck ');
const alertMsg = document.querySelector('#alert-modal-bck h5');
const alertTitle = document.querySelector('#alert-modal-bck h3');
const btnAlert = document.querySelector ('#alert button');
const btnHall = document.querySelector ('#hall button');
const hOfBtnOneHandler = document.getElementById('hall-of-fame-first');
const hOfBox = document.getElementById('hall-modal-bck')



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

// closeBtn.addEventListener('click', ()=>{
//     modal.style.display = 'none';
// })

hOfBtnOneHandler.addEventListener('click', ()=>{
    console.log('hall')
    hallBox(hOfBox)
})

mainFormHandler.addEventListener('click', (event)=>{
    event.preventDefault();
    const fixedTerm = fixInputValue (inputText); 
    const category = inputCategory.value;
    console.log(fixedTerm, category);
    
    if (fixedTerm === '' && category === '') return

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
    console.log('aaa')
    inputText.value = ''
    inputCategory.value = ''
    })

    // BAZA
    // db.collection("pojmovi").doc("Mttx3td52jElTszZ7eio").delete().then(function() {
    //     console.log("Document successfully deleted!");
    // }).catch(function(error) {
    //     console.error("Error removing document: ", error);
    // });
    
    let niz = []
    db.collection('pojmovi').get()
    .then(data=>{
        data.docs.forEach(doc=>{
            niz.push(doc.data())
            console.log(doc.id, " => ", doc.data());
            // console.log(doc.data())
        })
        console.log (niz)
    })
    
    // HALL oF

//     db.collection("pojmovi")
// // .orderBy("currencyType")
// .onSnapshot(snapshop => {
//     // console.log('this is snap:' + snapshop.docChanges())
//   let chages = snapshop.docChanges();
//   chages.forEach(change => {
//     console.log(change.doc.data())
//     // if (change.type == "added") {
//     //     banknoteListRender(change.doc);
//     //   } else if (change.type == "removed") {
//     //     let li = banknoteList.querySelector(`[data-id=${change.doc.id}]`);
//     //     banknoteList.removeChild(li);
//     //   }
//     });
//   });