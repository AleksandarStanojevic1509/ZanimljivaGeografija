export const writeEvent = (text) =>{
    const parent = document.querySelector ('#display-chat ul')
    const el =  document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el)
}


// export const printRandomLetter = (letter) => {
//     document.getElementById('random-letter-multi').innerHTML  = letter;
// }

export const gameStarsIn = () =>{
    setTimeout(()=>{

    },4000) 
}