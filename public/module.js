const alertModal = document.querySelector('#alert-modal-bck ')
const alertMsg = document.querySelector('#alert-modal-bck h5')

export const alertBox = (modal, msg, text) =>{
    modal.style.display = 'grid'
    msg.innerHTML = `${text}`
    

}
export const showModal = (modalForm, inputValue, modal)=>{
    modalForm.addEventListener('submit', (event)=>{
        if  (inputValue.value === ''){
            event.preventDefault();
            alertBox(alertModal, alertMsg, 'You need to enter username!!!')
        }
        else {
            event.preventDefault();
            localStorage.setItem('username', `${inputValue.value}`); 
            modal.style.display = 'block';            
            location.reload()
        }
    })    
}

export const fixInputValue = (inputText)=>{
    let suggestedTerm = inputText.value;
    suggestedTerm = suggestedTerm.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    let firstLetter = suggestedTerm.slice(0,1).toUpperCase();
    let restLetters = suggestedTerm.slice(1);
    return firstLetter + restLetters;
}

export const checkUser = (modalForm, inputValue, modal) =>{
    const userBox = document.querySelector('header>div')
    if(localStorage.getItem('username') === null) {
        showModal(modalForm, inputValue, modal);
    }
    else if (localStorage.getItem('username') !== null){
        userBox.innerHTML = `Hi,&nbsp <span> ${localStorage.getItem('username').toUpperCase()}</span>`
        modal.style.display = 'none';
    }
}
