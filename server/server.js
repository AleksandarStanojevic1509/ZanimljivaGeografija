const http = require ('http')
const express = require ('express')
const socketio = require('socket.io')

const newGame = require('./gameLogicServer.js')

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

 

let waitingPlayer = null
let username1;

io.on('connection', sock => {

    if(waitingPlayer) {
        sock.on('username', username2 => {
            if(username1 == username2) {
                // Don't start game if usernames are the same
                waitingPlayer = sock;
                waitingPlayer.emit('message', 'Sačеkajte svog protivnika...');
            } else {
                // Start game if usernames are not the same
                new newGame(waitingPlayer, sock);
                waitingPlayer = null;
                let letter = pickRandomLetter()
                io.emit('letter' , letter)
           
            }
        })
    } else {
        // Wait for an opponent
        waitingPlayer = sock;
        waitingPlayer.on('username', username => {
            username1 = username; // store waitingPlayer username
        });
        waitingPlayer.emit('message', 'Sačеkajte svog protivnika...')
    }

    sock.on('chat', text=>{
        io.emit('chat', text)
    })
});





// io.on('connection', (sock)=>{
//     // console.log('Someone conected')
//     // sock.emit('message', 'Hi you are connected!')

//     if (waitingPlayer){
//                new newGame(waitingPlayer, sock);
//                 waitingPlayer = null;
//                 let letter = pickRandomLetter()
//                 io.emit('letter' , letter)

//                 sock.on('chat', text=>{
//                     io.emit('chat', text)
//                 })
//     }
//     else{
//         waitingPlayer = sock
//         waitingPlayer.emit('message', 'Čeka se protivnik!')
//     }

//     sock.on('message', text=>{
//         io.emit('message', text)
//     })

//     sock.on('turn', answ =>{
//         console.log(answ)
//     })
// })

server.on('error', err =>{
    console.error("Server error: ", err )
})

server.listen(8000, () =>{
    console.log('app started at 8800')
})
