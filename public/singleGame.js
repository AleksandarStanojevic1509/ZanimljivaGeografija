import {fixInputValue, alertBox} from './general.js'


const resultTable = document.querySelector('#result-body')
const finalScore = document.getElementById('score')
const alertModal = document.querySelector('#alert-modal-bck');
const alertMsg = document.querySelector('#alert-modal-bck h5');
const alertTitle = document.querySelector('#alert-modal-bck h3');

let playerTotalPoints = 0;
let botTotalPoints = 0;

// declare who wins and show alert
export const declareWinnerAlert = (alert, playerTotalPoints, botTotalPoints)=>{
    if(playerTotalPoints> botTotalPoints){
        alert.innerHTML =  alertWinner(`Your score is: ${playerTotalPoints}.`, `${localStorage.username} wins!!!!`);
        return;
    }
    else if(playerTotalPoints < botTotalPoints){
        alert.innerHTML =  alertWinner(`His score is: ${botTotalPoints}.`, `Kompjuter wins!!!!`);
        return;
    }
    else if(playerTotalPoints === botTotalPoints){
        alert.innerHTML =  alertWinner(`You can try again.`, `It is a draw!!!`);
        return;
    }    
    
}

//render alert
const alertWinner = (info, title) =>{
    return ` <div id="alert-winner">
    <div style="display: flex;justify-content: center;align-items: center;">
        <img style="width:9rem"src="/public/img/globe.gif" alt="">    
    </div>
    <div style="display: flex; flex-direction: column; justify-content: space-around; align-items:center">
        <h3 style="margin: 0;">${title}</h3>
        <h5 style="margin: 0;">${info}</h5>
        <button class="btn" class="waves-effect waves-light btn-small">OK</button>
    </div>
</div>`
}

// check answers and add points
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

let finalAnswer = (chance, category) =>{
    if (chance < 20){            
        return '';
    }
    else {
        return category;
    }
}

const computerLuck = () =>{
    return Math.floor(Math.random() * 100)+1
}

// pick random term from array
const randomIndexAnswers = (arr) =>{
    return Math.floor(Math.random() * arr.length);
}

// collect users answers
const collectPayerAnswers = (playerForm) =>{
    return [fixInputValue(playerForm.children[0].children[0]), 
    fixInputValue(playerForm.children[1].children[0]), 
    fixInputValue(playerForm.children[2].children[0]),
    fixInputValue(playerForm.children[3].children[0]), 
    fixInputValue(playerForm.children[4].children[0]), 
    fixInputValue(playerForm.children[5].children[0]),
    fixInputValue(playerForm.children[6].children[0])]
}

// //////// GENERISE KOMP ODGOVORE
const generateComputerAnswers = () =>{
    
    let computerAnswers =[];
    let drzava = [];
    let grad = [];
    let reka = [];
    let planina = [];
    let zivotinja = [];
    let biljka = [];
    let predmet = [];
    
    return db.collection("pojmovi")
    .where("pocetnoSlovo","==", `${localStorage.randomLetter}`)
    .get()
    .then((data)=>{
        data.docs.forEach(doc=>{
            switch(doc.data().kategorija){
                case "Država":
                    drzava.push(doc.data().pojam);
                    break;
                    case "Grad":
                        grad.push(doc.data().pojam)
                        break;
                        case "Reka":
                            reka.push(doc.data().pojam)
                            break;
                            case "Planina":
                                planina.push(doc.data().pojam)
                                break;
                case "Životinja":
                    zivotinja.push(doc.data().pojam)
                    break;
                    case "Biljka":
                        biljka.push(doc.data().pojam)
                        break;
                case "Predmet":
                    predmet.push(doc.data().pojam)
                    break;
                }            
        })        
        return [drzava, grad, reka, planina, zivotinja, biljka, predmet];        
    })
    .then(data=>{
        computerAnswers = [];
        data.forEach(elem=>{
            let chance = computerLuck();
            let ans = finalAnswer(chance, elem[randomIndexAnswers(elem)]);
            computerAnswers.push(ans);
        })        
        return computerAnswers;
    })
}


export const getWinner  = (playerForm) =>{
    document.getElementById('res-user').innerHTML = `${localStorage.username}`
    let player = collectPayerAnswers(playerForm)
    let possibleAnswers = [];
    generateComputerAnswers()
    .then(bot =>{
        let category = ["Država", "Grad", "Reka", "Planina", "Životinja", "Biljka", "Predmet"]
        category.forEach(category =>{
            db.collection("pojmovi")
        .where("pocetnoSlovo", "==", `${localStorage.randomLetter}`)
        .where("kategorija", "==", category)
        .get()
        .then((data) => {
            data.docs.forEach((doc)=>{
                possibleAnswers.push(doc.data().pojam);               
            })
            switch (category){
                case "Država":
                    checkIfItIsTrue (possibleAnswers, bot[0], player[0], resultTable.children[0].children[1], resultTable.children[0].children[2], resultTable.children[0].children[3], resultTable.children[0].children[4]);
                    break;
                case "Grad":
                    checkIfItIsTrue (possibleAnswers, bot[1], player[1], resultTable.children[1].children[1], resultTable.children[1].children[2], resultTable.children[1].children[3], resultTable.children[1].children[4]);
                    break;
                case "Reka":
                    checkIfItIsTrue (possibleAnswers, bot[2], player[2], resultTable.children[2].children[1], resultTable.children[2].children[2], resultTable.children[2].children[3], resultTable.children[2].children[4]);
                    break;
                case "Planina":
                    checkIfItIsTrue (possibleAnswers, bot[3], player[3], resultTable.children[3].children[1], resultTable.children[3].children[2], resultTable.children[3].children[3], resultTable.children[3].children[4]);
                    break;
                case "Životinja":
                    checkIfItIsTrue (possibleAnswers, bot[4], player[4], resultTable.children[4].children[1], resultTable.children[4].children[2], resultTable.children[4].children[3], resultTable.children[4].children[4]);
                    break;
                case "Biljka":
                    checkIfItIsTrue (possibleAnswers, bot[5], player[5], resultTable.children[5].children[1], resultTable.children[5].children[2], resultTable.children[5].children[3], resultTable.children[5].children[4]);
                    break;
                case "Predmet":
                        checkIfItIsTrue (possibleAnswers, bot[6], player[6], resultTable.children[6].children[1], resultTable.children[6].children[2], resultTable.children[6].children[3], resultTable.children[6].children[4]);
                    break;
                }
                finalScore.children[0].innerHTML = `<p>${localStorage.username}: <span>${playerTotalPoints}</span></p>`;
                finalScore.children[1].innerHTML = `<p>Kompjuter: <span>${botTotalPoints}</span></p>`;
                
                declareWinnerAlert (document.querySelector('#alert-winner-bck'), playerTotalPoints, botTotalPoints);
        })
            playerTotalPoints = 0;
            botTotalPoints = 0;
            
            document.querySelector('#alert-winner-bck').style.display = 'grid';  
    })
    })
    .catch(err=>{
        alertBox(alertModal, alertMsg, alertTitle, 'Sorry, we have too many requests, please try later!', 'Oops!!!');
    })
}

