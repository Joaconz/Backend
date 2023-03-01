import { Router } from "express";
import ProductRouter from "./products.js"
import CartRouter from "./carts.js"
// import MessageRouter from "./home.js"


const router = Router()

// router.get('/')

router.use('/api/products', ProductRouter)
// router.use('/api/carts', CartRouter)

export default router