import express, { json, urlencoded} from 'express'
// import cookieParser from 'cookie-parser'
// import usersRouter from './routes/users.router.js'
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
// import { uploader } from './utils.js'

const app = express()
const PORT = 8080

app.use(json())
app.use(urlencoded({extended:true}))
// console.log(__dirname)
// app.use('/virtual' ,static(__dirname+'/public'))
// app.use(cookieParser())


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})
