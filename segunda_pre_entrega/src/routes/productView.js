import ProductManager from '../dao/classes/MongoDB/ProductManager.js';
import { Router } from 'express'

const router = Router()
const productManager = new ProductManager();

router.get('/', async (req, res)=>{
    const {limit, page, query, sort } = req.query
    let info = await productManager.getProducts(limit, page, query, sort)
    let products = info.docs
    console.log(products);
    res.render('products', {
        products
    })
    // res.send(info)
})  

export default router