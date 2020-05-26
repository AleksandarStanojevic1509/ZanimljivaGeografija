export const fixInputValue = (inputText)=>{
    let suggestedTerm = inputText.value;
    suggestedTerm = suggestedTerm.replace(/\s+/g, '').replace(/[^a-zđščžć]+/gi, '').toLowerCase()
    let firstLetter = suggestedTerm.slice(0,1).toUpperCase();
    let restLetters = suggestedTerm.slice(1);
    return firstLetter + restLetters;
}
export const checkFirstLetter = (fixedTerm) =>{
    if(fixedTerm.slice(0,2) === 'Nj' || fixedTerm.slice(0,2) === 'Lj' || fixedTerm.slice(0,2) === 'Dž'){
        return fixedTerm.slice(0,2);
    }
    else {
        return fixedTerm.slice(0,1);
    }
}

export const alertBox = (modal, msg, title, msgText, titleText) =>{
    modal.style.display = 'grid';
    msg.innerHTML = `${msgText}`;
    title.innerHTML = `${titleText}`;  
}

export const pickRandomLetter = () =>{
    let letters = ["A", "B", "C", "Č", "Ć", "D", "Dž", "Đ", "E", "F", "G", "H", "I", "J", "K", "L", "Lj", "M", "N", "Nj", "O", "P", "R", "S", "Š", "T", "U", "V", "Z", "Ž"];
    let random = Math.floor(Math.random()*letters.length);
    return letters[random];
}

export let resetData = (userAnswersBox, playerForm) =>{
    document.getElementById('time-to-end').innerHTML = '';
    userAnswersBox.style.display = 'none';
    playerForm.reset();
}