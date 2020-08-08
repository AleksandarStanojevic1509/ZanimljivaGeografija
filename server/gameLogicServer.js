class newGame {
    constructor(pl1, pl2) {
        this.players = [pl1, pl2];
        this.turns = [null, null]

        this.sendMsgToAll("Početak igre!");
        this.sendStart(true)

        this.players.forEach( (player, index) => {
            player.on('answers', (answ) => {
                console.log(answ)
                this.onTurns(index, answ)
            })
        })

        // setTimeout za apocetak igre od 3 sekunde
    }

    sendMsgToPlayer(playerIndex, msg) {
        this.players[playerIndex].emit('message', msg)
    }

    sendMsgToAll(msg) {
        this.players.forEach((player) => player.emit("message", msg));
    }

    sendStart(start){
        this.players.forEach((player) => player.emit("start", start));
    }

    onTurns(playerIndex, turn){
        // if(this.turns[playerIndex] === null){
        //     this.turns[playerIndex] = turn;
        //     this.sendMsgToPlayer(playerIndex, `Your answers was sent! `) 
        // }
        // else{
        //     return
        // }
        console.log('this is form ont turn ' + turn)
        this.turns[playerIndex] = turn;
        this.sendMsgToPlayer(playerIndex, `Odgovori su poslati! ${turn}`)
    }

    checkGameOver(){
        const turns = this.turns
        if(turns[0]&& turns[1]){
            this.sendMsgToAll(`Kraj igre ${turns.join(' : ')}`)
            this.turns = [null, null]
            this.sendMsgToAll(`Nova partija!`)
        }
    }

}


module.exports = newGame;