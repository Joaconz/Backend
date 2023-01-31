import express, { json, urlencoded} from 'express'
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import handlebars from 'express-handlebars'

import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 8080

let array = ['Juan', 'Pedro', 'Jorge', 'Juan2', 'Juan3']

app.use(json())
app.use(urlencoded({extended:true}))
// console.log(__dirname)
app.use(express.static(__dirname+'/public'))


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'views')
app.set('view engine', 'handlebars')

app.get('/', (req, res)=>{
    
    // array.forEach(name => {
    //     res.render('index', name)
    // });
    res.render('index', 'joaco')
})


app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})
