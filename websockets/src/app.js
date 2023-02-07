import express, { json, urlencoded} from 'express'
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import realTimeProducts from './routes/realTimeProducts.js'

import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { Server } from 'socket.io'

const app = express()
const PORT = 8080
app.use(json())
app.use(urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))


const httpServer = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})

const socketServer = new Server(httpServer)


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

// app.use('/api/products', productsRouter)
// app.use('/api/carts', cartsRouter)
app.use('/realTimeProducts', realTimeProducts)

socketServer.on('connection', socket=>{
    console.log('Nuevo cliente conectado');

    socket.on("product", data=>{
        //  console.log(data);
        //enviar data a post
        // app.post('/realTimeProducts', (req, res)=>{
        //     req.body === data
        //     console.log(req.body);
        // })
    })

    socket.emit("products", 
    //app.get()
    [{
        title: 'title 1',
        price: '100'
    },
    {
        title: 'title 2',
        price: '200'
    }])
})

