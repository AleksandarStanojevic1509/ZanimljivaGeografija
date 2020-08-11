const http = require ('http')
const express = require ('express')
const socketio = require('socket.io')

const Game = require('./gameLogicServer.js')

const app = express();


const clientPath = `${__dirname}/../public`
console.log(`Serving static from ${clientPath}`)
app.use(express.static(clientPath))


const server = http.createServer(app)


const io = socketio(server);


let pickRandomLetter = () =>{
    let letters = ["A", "B", "C", "Č", "Ć", "D", "Dž", "Đ", "E", "F", "G", "H", "I", "J", "K", "L", "Lj", "M", "N", "Nj", "O", "P", "R", "S", "Š", "T", "U", "V", "Z", "Ž"];
    let random = Math.floor(Math.random()*letters.length);
    return letters[random];
}



let waitingPlayer = null;


io.on("connection", (sock) => {

    if (waitingPlayer) {
        new Game(waitingPlayer, sock)
        waitingPlayer = null;
        let letter = pickRandomLetter();
        io.emit('letter' , letter);             
           
    } else {
        waitingPlayer = sock;
        waitingPlayer.emit("message", "Sačеkajte svog protivnika!");
    }

    // server dobija poruke od soketa (sock.on) i salje ih svima na serveru (io.emit)
    sock.on("message", (text) => {
        io.emit("message", text);
    });
 
});


server.on('error', err =>{
    console.error("Server error: ", err )
})

server.listen(8100, () =>{
    console.log('app started at 8800')
})
