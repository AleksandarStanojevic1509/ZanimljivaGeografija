class newGame {
    constructor(pl1, pl2) {
        this.players = [pl1, pl2];
        this.turns = [null, null]

        this.sendMsgToAll("Game Starts!");
    }

    sendMsgToPlayer(playerIndex, msg) {
        this.players[playerIndex].emit('message', msg)

    }

    sendMsgToAll(msg) {
        this.players.forEach((player) => player.emit("message", msg));
    }

    onTurns(playerIndex, turn){
        // if(this.turns[playerIndex] === null){
        //     this.turns[playerIndex] = turn;
        //     this.sendMsgToPlayer(playerIndex, `Your answers was sent!`) 
        // }
        // else{
        //     return
        // }
        this.turns[playerIndex] = turn;
        this.sendMsgToPlayer(playerIndex, `Your answers was sent!`)
    }
}

module.exports = newGame;
