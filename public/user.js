import {alertBox} from "./general.js"

const alertModal = document.querySelector('#alert-modal-bck ')
const alertMsg = document.querySelector('#alert-modal-bck h5')
const alertTitle = document.querySelector('#alert-modal-bck h3')

export const showModal = (modalForm, inputValue, modal)=>{
    modalForm.addEventListener('submit', (event)=>{
        if  (inputValue.value === ''){
            event.preventDefault();
            alertBox(alertModal, alertMsg, alertTitle, 'You need to enter username!!!', 'Oops...')
        }
        else {
            event.preventDefault();
            localStorage.setItem('username', `${inputValue.value}`); 
            modal.style.display = 'block';            
            location.reload()
        }
    })    
}
export const checkUser = (modalForm, inputValue, modal) =>{
    const userBox = document.querySelector('header>div')
    if(localStorage.getItem('username') === null) {
        showModal(modalForm, inputValue, modal);
    }
    else if (localStorage.getItem('username') !== null){
        userBox.innerHTML = `Hi,&nbsp <span> ${localStorage.getItem('username')}</span>`
        modal.style.display = 'none';
    }
}