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