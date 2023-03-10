import ProductManager from '../classes/ProductManager.js'
import { Router } from 'express'

const router = Router()
const productManager = new ProductManager('./json/products.json');

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


router.get('/', async (req, res)=>{
    const {limit} = req.query
    let info = await queryImport(limit)
    res.send(info)
})  

router.get('/:pid', async (req, res)=>{
    const { pid } = req.params
    let info = await productManager.getProductById(parseInt(pid))
    res.send(info)
})  

router.post('/', async (req, res)=>{
        let {title, description, code, price, stock, category, thumbnail} = req.body
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).send({ message: 'Completar los datos faltantes'})
        }
        productManager.addProducts(title, description, price, thumbnail, code, stock, category)
        res.status(201).send({ 
            message: 'usuario creado' 
        })
    
})  

router.put('/:pid', async (req, res)=>{
    const { pid } = req.params
    let product = req.body
    let entries = Object.entries(product)
    entries.forEach(async (keyValue)=>{
        console.log(pid, keyValue[0], keyValue[1]);
        productManager.updateProduct(parseInt(pid), keyValue[0], keyValue[1])
    })

    res.status(201).send({ 
        product,
        message: 'usuario Modificado' 
    })

})

router.delete('/:pid', async (req, res)=>{
    const { pid } = req.params
    productManager.deleteProduct(parseInt(pid))
    res.status(201).send({ 
        message: 'Producto Eliminado' 
    })
})

export default router

