const modal = document.getElementById ('modal-bck');
const modalForm = document.querySelector('#log-in form');
const inputValue = document.getElementById('username');
const switchUser = document.querySelector('header i');
const mainFormHandler = document.getElementById('submit');
const inputText = document.getElementById('add-new-term');
const inputCategory = document.getElementById('category');

const showModal = (modalForm, inputValue, modal)=>{
    modalForm.addEventListener('submit', (event)=>{
        if  (inputValue.value === ''){
            alert ('Mora se uneti korisnicko ime!!'); //napraviti kasvetan alert
        }
        else {
            event.preventDefault();
            localStorage.setItem('username', `${inputValue.value}`); 
            modal.style.display = 'none';
            
        }
    })
    
}

const fixInputValue = (inputText)=>{
    let suggestedTerm = inputText.value;
    suggestedTerm = suggestedTerm.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    let firstLetter = suggestedTerm.slice(0,1).toUpperCase();
    let restLetters = suggestedTerm.slice(1);
    return firstLetter + restLetters;
}
        

if(localStorage.getItem('username') === null) {
    showModal(modalForm, inputValue, modal);
}
else if (localStorage.getItem('username') !== null){
    modal.style.display = 'none';
}

switchUser.addEventListener('click', ()=>{
    modal.style.display = 'block';
    inputValue.value = '';
    showModal(modalForm, inputValue, modal);
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
        alert ('Pojam postoji') // napraviti kasvetni alet
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
        }
      })
      .catch((error) => {
        console.log("Error getting document: ", error);
      });
      inputText.value = ''
      inputCategory.value = ''
})
