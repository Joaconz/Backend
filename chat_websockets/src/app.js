import express, { json, urlencoded} from 'express'
import handlebars from 'express-handlebars'
import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { Server } from 'socket.io'
import { Dotenv } from 'dotenv'

Dotenv.config()

const app = express()
const PORT = 8080 || process.env.PORT
app.use(json())
app.use(urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

const httpServer = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.get('/', (req, res, next)=>{
    res.render('chat')
})

const io = new Server(httpServer)

const messages = [
    {user: 'Fede', message: "Hola como estan"}
]

io.on('connection', socket=>{
    console.log('Nuevo cliente conectado');

    socket.on('message', data=>{
        console.log(data);
        messages.push(data)
        io.emit('messageLog', messages)
    })

    socket.on('authenticated', data=>{
        socket.broadcast.emit('newUserConnect', data)
    })

})

