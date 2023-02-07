import { Router } from 'express'
import ProductManager from '../classes/ProductManager.js'

const router = Router()
const productManager = new ProductManager('./json/products.json');

router.get('/', async (req, res)=>{
    let products = await productManager.getProducts()
    res.render('realTimeProducts', {products})
    // console.log(req.body);
})

router.post('/', async (req, res)=>{
    let product = res.body

})

export default router