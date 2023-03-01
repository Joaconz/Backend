import CartModel from "../../models/cart.js"

export default class CartManager { 
    #carts
    constructor(){
        this.#carts = []
    }

    async createCart () {
        try {
            await CartModel.create([])
        } catch (error) {
            console.log(error);
        }
    }

    async getCart (id) {
        
    }

    async addProduct (cid, pid) {

    }

    
    // async getProducts () {
    //     this.#products = await ProductModel.find({})
    //     return this.#products
    //   }
    
    //   async getProductById (id) {
    //     let product = await ProductModel.findById(id)
    //     return product
    //   }
    
    //   async addProduct (title, description, price, thumbnail, code, stock, category) {
    //     // const {title, description, price, thumbnail, code, stock, category} = product
    //     try {
    //         let product = await ProductModel.create({
    //         title,
    //         description,
    //         price,
    //         thumbnail: (thumbnail===undefined? "Sin imagen" : thumbnail),
    //         code,
    //         stock, 
    //         category
    //         })
    //         console.log('Product added');
    //         return (product)
    //     } catch (error) {
    //         return error
    //     }
    //   }
    
    //   async updateProduct (id, obj) {
    //     try {
    //          await ProductModel.findByIdAndUpdate(id, obj, (err, doc)=>{
    //           if (err) console.log(err);
    //           else {console.log('updated');}
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    //   }
    
    //   async deleteProduct (id) {
    //     try {
    //         // await ProductModel.delete
    //         await ProductModel.findByIdAndDelete(id, (err, doc)=>{
    //           if (err) console.log(err);
    //           else {console.log('deleted');}
    //           // return doc
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    //   }
}