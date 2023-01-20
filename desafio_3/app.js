import express from 'express'
import ProductManager from './ProductManager.js';

const app = express()
const PORT = 8080
const productManager = new ProductManager('./products.json');

const queryImport = async (limit) => {
    const array = []
    if (limit === undefined) {
        return await productManager.getProducts() 
    }
    else {
        for (let index = 1; index <= limit; index++) {
            array.push(await productManager.getProductById(index))
        }
        return array
    }
}

const paramsImport = async (id) => await productManager.getProductById(id)

app.get('/products', async (req, res)=>{
    const {limit} = req.query
    let info = await queryImport(limit)
    res.send(info)
})

app.get('/products/:id', async (req, res)=>{
    const { id } = req.params
    let info = await paramsImport(parseInt(id))
    res.send(info)
})

app.listen(PORT, (err)=>{
    if (err) console.log(err);
    console.log(`Escuchando en el puerto ${PORT}`);
})