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
let usr1;

io.on('connection', sock =>{

    if(waitingPlayer){
        sock.on('userName', usr2 =>{
            if(usr1 === usr2 || usr1 === undefined){
                usr1 = usr2;
                waitingPlayer = sock;
                waitingPlayer.emit("message", "Sačеkajte svog protivnika!");
            }
            else{
                new Game(waitingPlayer, sock)
                let letter = pickRandomLetter();
                [waitingPlayer, sock].forEach(player=>{
                    player.emit('letter' , letter);
                })
                waitingPlayer = null;
                usr1 = undefined;
            }
        })
    }
    else{
        waitingPlayer = sock;
        waitingPlayer.on('userName', user => {
            usr1 = user;
        })
        waitingPlayer.emit("message", "Sačеkajte svog protivnika!");
    }

        // server dobija poruke od soketa (sock.on) i salje ih svima na serveru (io.emit)
    sock.on("message", (text) => {
        io.emit("message", text);
    });

    // sock.on('disconnect', ()=>{
    //     io.emit('playerDisconneted', 'disc')
    //     waitingPlayer = null 
    // });
})

server.on('error', err =>{
    console.error("Server error: ", err )
})


server.listen(8110, () =>{
    console.log('app started at 8110')
})
