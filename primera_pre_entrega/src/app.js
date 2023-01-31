import express, { json, urlencoded} from 'express'
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 8080

app.use(json())
app.use(urlencoded({extended:true}))
console.log(__dirname)
// app.use('/virtual' ,static(__dirname+'/public'))


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})
