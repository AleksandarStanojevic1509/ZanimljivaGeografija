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

let waitingPlayer = null

io.on('connection', (sock)=>{
    // console.log('Someone conected')
    // sock.emit('message', 'Hi you are connected!')

    if (waitingPlayer){
     new newGame(waitingPlayer,sock)
        waitingPlayer = null
    }
    else{
        waitingPlayer = sock
        waitingPlayer.emit('message', 'Waiting for an oppponent!')
    }

    sock.on('message', text=>{
        io.emit('message', text)
    })

    sock.on('answers', answ=>{
        console.log(answ)
    })
})



server.on('error', err =>{
    console.error("Server error: ", err )
})

server.listen(8800, () =>{
    console.log('app started at 8008')
})
