import ProductManager from '../ProductManager'
import { Router } from 'express'

const router = Router()
const productManager = new ProductManager('../products.json');

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
    const { id } = req.params
    let info = await paramsImport(parseInt(id))
    res.send(info)
})  

router.post('/', (req, res)=>{
    
})  

router.put('/:pid', (req, res)=>{
    
})

router.delete('/:pid', (req, res)=>{
    
})

router.get('/', (req, res)=>{
    
})  