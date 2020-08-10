export const writeEvent = (text) =>{
    const parent = document.querySelector ('#display-chat ul')
    const el =  document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
    document.getElementById('display-chat').scrollTop = document.getElementById('display-chat').scrollHeight;

}



// export const startMultiPlayer = (countDown) =>{
//     console.log ('Igra je pocela.... ')
//     let gameTime = setInterval( () => {
//         if(countDown === 0){
//             // submituj formu i proglasi pobednika

//             // getWinner(playerForm)
//             // resultBackgound.style.display = 'block'
//             // reset countDown Time 
//             clearInterval(gameTime);
//             countDown = 20;
//             // resetData(userAnswersBox, playerForm);
//         }
//     else {
//         countDown--;
//         let createTime = new Date (countDown * 1000);
//         let sec = createTime.getMinutes()*60 + createTime.getSeconds() ; 
//         console.log(sec)
//         if(sec < 10){
//             document.querySelectorAll('.time-to-end').forEach(elem=>{
//                 elem.innerHTML = `<span style="color:red">${sec}<span>`;
//             })
//         }
//         else{
//             document.querySelectorAll('.time-to-end').forEach(elem=>{
//                 elem.innerHTML = `<span style="color:black">${sec}<span>`;
//             })
//         }
//     }
// }, 1000);

    // tajmer
    // game logic
    // 
// }


// export const printRandomLetter = (letter) => {
//     document.getElementById('random-letter-multi').innerHTML  = letter;
// }

export const gameStarsIn = () =>{
    setTimeout(()=>{

    },4000) 
}

// tajmer 

