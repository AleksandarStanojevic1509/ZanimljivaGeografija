import {alertBox} from "./general.js"

// const alertModal = document.querySelector('#alert-modal-bck');
// const alertMsg = document.querySelector('#alert-modal-bck h5');
// const alertTitle = document.querySelector('#alert-modal-bck h3');

export const addTerm = (fixedTerm, firstLetter, category, inputCategory, alertModal, alertMsg, alertTitle) =>{

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
    
}