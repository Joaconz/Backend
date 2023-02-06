import { Router } from 'express'
import ProductManager from '../classes/ProductManager.js'

const router = Router()
const productManager = new ProductManager('./json/products.json');

router.get('/', async (req, res)=>{
    let products = await productManager.getProducts()
    res.render('realTimeProducts', {})
})

export default router