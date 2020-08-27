class Game {
    constructor(pl1, pl2) {
        this.players = [pl1, pl2];
        this.turns = [null, null]

        this.sendMsgToAll("Početak igre!");
        this.sendStart('Pocetak')

        this.players.forEach( (player, index) => {
            player.on('answers', (answers) => {
                this.onTurns(index, answers)
            })
        })
        this.players.forEach((player)=>{
            player.on('chat', text=>{
                this.players.forEach(player=>{
                    player.emit('chat', text)
                })
            })            
        })

        let arrObj = [];
        this.players.forEach((player)=>{
            player.on('result', data=>{
                arrObj.push(data);
                if(arrObj.length === 2 ){
                    this.players[0].emit('answersForRender', arrObj);
                    this.players[1].emit('answersForRender', arrObj);
                }
            }) 
        })  

        // this.players.forEach((player) => {
        //     player.on('clearSoket', () => {
        //         player.disconnect()
        //     });
        // });

        this.players.forEach(player=>{
            player.on('disconnect', ()=>{
                this.players.forEach(sock =>{
                    if(player !== sock){
                        sock.emit('playerDisconneted', 'disc');
                    }
                })
            })
        })


    }

    sendMsgToPlayer(playerIndex, msg) {
        this.players[playerIndex].emit('message', msg);
    }

    sendMsgToAll(msg) {
        this.players.forEach((player) => player.emit("message", msg));
    }

    sendStart(start){
        this.players.forEach((player) => player.emit("start", start));
    }

    onTurns(playerIndex, turn){
        if(this.turns[playerIndex] === null){
            this.turns[playerIndex] = turn;
            this.sendMsgToPlayer(playerIndex, `Odgovori su poslati!`);
            this.sendAnswersToClient()
            this.checkGameOver()
        }
        else{
            this.sendMsgToPlayer(playerIndex, `Već su poslati rezultati, sačekajte novu partiju!`);            
        }        
    }

    sendAnswersToClient(){
        const turns = this.turns
        if(turns[0] && turns[1]){
            this.sendOpponentAnswers([turns[1], turns[0]]);
            this.sendUserAnswers([turns[0], turns[1]]);
           }
    }


    sendUserAnswers(answers){
        this.players[0].emit('sendAnswers', answers);
    }
    
    sendOpponentAnswers(answers){
        this.players[1].emit('sendAnswers', answers);
    }


    checkGameOver(){
        const turns = this.turns;
        if(turns[0]&& turns[1]){
            this.turns = [null, null];
            this.sendMsgToAll(`Nova partija!`);


        }
    }

}


module.exports = Game;