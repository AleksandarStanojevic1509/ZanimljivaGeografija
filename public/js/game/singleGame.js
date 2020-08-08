import {collectPlayerAnswers, declareWinnerAlert} from './game.js'

const resultTable = document.querySelector('#result-body')
const finalScore = document.getElementById('score')
// const playerForm = document.querySelector('#game-answers form');

let category = ["Država", "Grad", "Reka", "Planina", "Životinja", "Biljka", "Predmet"]

let playerTotalPoints = 0;
let botTotalPoints = 0;

const checkIfItIsTrue = (answers, bot, player, plTerm, plPoints, botTerm, botPoints)=>{   
    if(answers.includes(bot) && answers.includes(player)){
        if(bot === player ){
            plTerm.innerHTML = `${player} `;
            botTerm.innerHTML = `${bot}`;
            plPoints.innerHTML = `+5`;
            botPoints.innerHTML = `+5`;
            playerTotalPoints += 5;
            botTotalPoints += 5;
            return;
        }
        else {
            plTerm.innerHTML = `${player} `;
            botTerm.innerHTML = `${bot}`;
            plPoints.innerHTML = `+10`;
            botPoints.innerHTML = `+10`;
            playerTotalPoints += 10;
            botTotalPoints += 10;
            return;
        }
    }
    if(answers.includes(bot)){
        plTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        botTerm.innerHTML = `${bot}`;
        plPoints.innerHTML = `+0`;
        botPoints.innerHTML = `+15`;
        playerTotalPoints += 0;
        botTotalPoints += 15;
        return;
    }
    if (answers.includes(player)){
        plTerm.innerHTML = `${player}`
        botTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        plPoints.innerHTML = `+15`;
        botPoints.innerHTML = `+0`;
        playerTotalPoints += 15;
        botTotalPoints += 0;
        return;
    }
    else {
        plTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        botTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
        plPoints.innerHTML = `+0`;
        botPoints.innerHTML = `+0`;
        playerTotalPoints += 0;
        botTotalPoints += 0;
    }
}

let finalAnswer = (chance, term) =>{
    if (chance < 0.2){            
        return '';
    }
    else {
        return term;
    }
}


//////// GENERISE KOMP ODGOVORE i PROVERAVA POBEDNIKA
export const getWinner = (playerForm) =>{
    let answer;
    let player = collectPlayerAnswers(playerForm)
    let possibleAnswers = [];
    category.forEach((elem)=>{
        db.collection("pojmovi")
        .where("pocetnoSlovo", "==", `${localStorage.randomLetter}`)
        .where("kategorija", "==", elem)
        .get()
        .then(snapshot => {
            const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
            if (snapshot.docs[randomIndex] === undefined){
                return  answer = '';
            }
            else {
                answer = finalAnswer(Math.random(), snapshot.docs[randomIndex].data().pojam);
            }           
            return answer;
        })
        .then( dataAN =>{
            db.collection("pojmovi")
            .where("pocetnoSlovo", "==", `${localStorage.randomLetter}`)
            .where("kategorija", "==", elem)
            .get()
            .then((data) => {
            data.docs.forEach((doc)=>{
                possibleAnswers.push(doc.data().pojam);               
            })
            console.log(possibleAnswers)
            switch (elem){
                case "Država":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[0], resultTable.children[0].children[1], resultTable.children[0].children[2], resultTable.children[0].children[3], resultTable.children[0].children[4]);
                    break;
                case "Grad":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[1], resultTable.children[1].children[1], resultTable.children[1].children[2], resultTable.children[1].children[3], resultTable.children[1].children[4]);
                    break;
                case "Reka":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[2], resultTable.children[2].children[1], resultTable.children[2].children[2], resultTable.children[2].children[3], resultTable.children[2].children[4]);
                    break;
                case "Planina":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[3], resultTable.children[3].children[1], resultTable.children[3].children[2], resultTable.children[3].children[3], resultTable.children[3].children[4]);
                    break;
                case "Životinja":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[4], resultTable.children[4].children[1], resultTable.children[4].children[2], resultTable.children[4].children[3], resultTable.children[4].children[4]);
                    break;
                case "Biljka":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[5], resultTable.children[5].children[1], resultTable.children[5].children[2], resultTable.children[5].children[3], resultTable.children[5].children[4]);
                    break;
                case "Predmet":
                    checkIfItIsTrue (possibleAnswers, dataAN, player[6], resultTable.children[6].children[1], resultTable.children[6].children[2], resultTable.children[6].children[3], resultTable.children[6].children[4]);
                    break;
                }
                finalScore.children[0].innerHTML = `<p>${localStorage.username}: <span>${playerTotalPoints}</span></p>`;
                finalScore.children[1].innerHTML = `<p>Kompjuter: <span>${botTotalPoints}</span></p>`;
                if(elem === "Predmet"){
                    declareWinnerAlert (playerTotalPoints, botTotalPoints, `Kompjuter je pobedio!!!!`)
                }
            })
            playerTotalPoints = 0;
            botTotalPoints = 0;
            possibleAnswers = []
            document.querySelector('#alert-winner-bck').style.display = 'grid'
    })
    .catch((error) => {
        alertBox(alertModal, alertMsg, alertTitle, 'Žao nam je imamo previše zahteva. Pokušajte kasnije!', 'Oops!!!');
    });
})
}

///// DRUGI NACIN


// const generateBotAnswer = (category, firstLetter) =>{
//     let singleAnswer = new Promise ((resolve, reject)=>{
//         let answer;
//         let key = db.collection('pojmovi').doc().id;
//         // console.log(key)
//         db.collection('pojmovi')
//         .where('kategorija', '==', category)
//         .where('pocetnoSlovo', '==', firstLetter)
//         .where(firebase.firestore.FieldPath.documentId(), '>=', key)
//         .limit(1)
//         .get()
//         .then(snapshot => {
//             const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
//             if (snapshot.docs[randomIndex] === undefined){
//                 answer = '';
//             }
//             else {
//                 answer = finalAnswer(Math.random(), snapshot.docs[randomIndex].data().pojam);
//             }           
//             resolve(answer);
//         })
//     }) 
//     return singleAnswer;
// }



// let checkIfItIsTrue = (isBotExist, isUserExist, bot, player,  plTerm, plPoints, botTerm, botPoints)=>{
    
//     return new Promise((resolve,reject)=>{

//         if(isBotExist && isUserExist){
//             if(bot === player ){
//                 console.log('test')
//                 plTerm.innerHTML = `${player} `;
//                 botTerm.innerHTML = `${bot}`;
//                 plPoints.innerHTML = `+5`;
//                 botPoints.innerHTML = `+5`;
//                 resolve ([5,5])
//                 // playerTotalPoints += 5;
//                 // botTotalPoints += 5;
//             }
//             else {
//                 plTerm.innerHTML = `${player} `;
//                 botTerm.innerHTML = `${bot}`;
//                 plPoints.innerHTML = `+10`;
//                 botPoints.innerHTML = `+10`;
//                 resolve ([10,10])
//                 // playerTotalPoints += 10;
//                 // botTotalPoints += 10;
//             }
//         }
//         else if(isBotExist){
//             plTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
//             botTerm.innerHTML = `${bot}`;
//             plPoints.innerHTML = `+0`;
//             botPoints.innerHTML = `+15`;
//             resolve ([0,15])
//             // playerTotalPoints += 0;
//             // botTotalPoints += 15;
//         }
//         else if (isUserExist){
//             plTerm.innerHTML = `${player}`
//             botTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
//             plPoints.innerHTML = `+15`;
//             botPoints.innerHTML = `+0`;
//             resolve ([15,0])
//             // playerTotalPoints += 15;
//             // botTotalPoints += 0;    
//         }
//         else {
//             plTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
//             botTerm.innerHTML = `<span style="color:tomato; font-weight:500">X</span>`;
//             plPoints.innerHTML = `+0`;
//             botPoints.innerHTML = `+0`;
//             resolve ([0,0])
//             // playerTotalPoints += 0;
//             // botTotalPoints += 0;
//         }
    

//     })
    
    
    
// }


// const checkAnsw = (cat, term) => {   
//     return new Promise((resolve, reject)=>{

//         db.collection("pojmovi")
//             .where("pocetnoSlovo", "==", `${localStorage.randomLetter}`)
//             .where("kategorija", "==", cat)
//             .where("pojam", "==", term)
//             .get()
//             .then(querySnapshot =>{
//                 if (querySnapshot.size > 0){
//                     // console.log('ima')
//                     resolve (true) 
//                 }
//                 else {
//                     // console.log('nema')
//                     resolve(false)
//                 }                
//         })
//     }) 
// } 

// let user = 0
// let bot = 0

// export const getWinner = async()=>{
// // let playerTotalPoints = 0;
// // let botTotalPoints = 0;

//     console.log('POCETAK')

//     let playerAnswers = collectPlayerAnswers(playerForm)
//     let botAnswers = await Promise.all([generateBotAnswer('Država', localStorage.randomLetter), 
//                                         generateBotAnswer('Grad', localStorage.randomLetter),
//                                         generateBotAnswer('Reka', localStorage.randomLetter),
//                                         generateBotAnswer('Planina', localStorage.randomLetter),
//                                         generateBotAnswer('Životinja', localStorage.randomLetter),
//                                         generateBotAnswer('Biljka', localStorage.randomLetter),
//                                         generateBotAnswer('Predmet', localStorage.randomLetter),
//                                     ])

// for (let i = 0; i<= category.length; i++){
    
//     // console.log (category[i], playerAnswers[i], botAnswers[i])
//     let isBotExist = await checkAnsw (category[i], botAnswers[i])
//     let isUserExist = await checkAnsw (category[i], playerAnswers[i])
    
//         // console.log("bot " + botAnswers[i] +' ' + isBotExist)
//         // console.log("user " + playerAnswers[i] +' '  + isUserExist)
        
//         let getScore = await checkIfItIsTrue(isBotExist, isUserExist, botAnswers[i], playerAnswers[i], resultTable.children[i].children[1], resultTable.children[i].children[2], resultTable.children[i].children[3], resultTable.children[i].children[4])
        
//         console.log('rezultat usera  ' + getScore[0])
//         console.log('rezultat bota  ' + getScore[1])
        
//         user += getScore[0]
//         bot += getScore [1]
        
//         finalScore.children[0].innerHTML = `<p>${localStorage.username}: <span>${user}</span></p>`;
//         finalScore.children[1].innerHTML = `<p>Kompjuter: <span>${bot}</span></p>`;
        
//         // 
//         console.log('KRAJssssssss')
//     }     

    
//     // console.log('asasasasa')
//     // declareWinnerAlert (user, bot, `Bot wins!!!!`)
    
//     // console.log('KONACNI REZULTAT' + user, bot)
//     // console.log (user, bot)
    
//     console.log('KRAJ')
    
//     // if(elem === "Predmet"){
//         //     declareWinnerAlert (playerTotalPoints, botTotalPoints, `Bot wins!!!!`)
//                     // }
//                     alert('asasas')

    
                    
//                     setTimeout(()=>{
//                         console.log('ssssSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
                        
//                     },6000)
// }