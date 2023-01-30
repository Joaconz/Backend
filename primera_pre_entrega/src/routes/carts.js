import { Router } from 'express'
import CartManager from '../CartManager.js'

const router = Router()

const cartManager = new CartManager('./src/carts.json');


router.post('/', async (req, res)=>{
    //crear un carrito con id y array de products vacio
    cartManager.createCart()
    res.send('done')

})

router.get('/:cid', async (req, res)=>{
    //mostrar el array de productos del carrito seleccionado
    const { cid } = req.params
    let cart = await cartManager.getProducts(parseInt(cid))
    // console.log(cart);
    res.send(cart.products)
})

router.post('/:cid/product/:pid', async (req, res)=>{
    //agregar el producto al carrito seleccionado, es un objeto con el id y cantidad del producto

})

export default router