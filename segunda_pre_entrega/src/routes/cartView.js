import { Router } from 'express'
import CartManager from '../dao/classes/MongoDB/CartManager.js';

const router = Router()

const cartManager = new CartManager();

router.get('/:cid', async (req, res)=>{
    const { cid } = req.params
    let info = await cartManager.getCart(cid)
    // console.log(info);
    let cart = {
        _id: info._id,
        products: info.products
    }
    res.render('carts', {
        cart
    })
    // res.send(info)
})

export default router