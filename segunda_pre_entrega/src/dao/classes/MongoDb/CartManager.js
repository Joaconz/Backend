import CartModel from "../../models/cart.js"

export default class CartManager { 
    #carts
    constructor(){
        this.#carts = []
    }

    async createCart () {
        try {
            await CartModel.create({
                products: []
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getCart (id) {
        try {
            return await CartModel.findById(id)
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct (cid, pid) {
        try {
            let cart = await CartModel.findById(cid)
            let product = cart.products.findIndex(prod => prod.id === pid)
            if (product > -1) {
                cart.products[product].quantity++
                let update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            } else {
                cart.products.push({_id: pid})
                let update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addProductQuantity (cid, pid, quantity) {
        try {
            let cart = await CartModel.findById(cid)
            let product = cart.products.findIndex(prod => prod.id === pid)
            if (product > -1) {
                cart.products[product].quantity = parseInt(quantity)
                let update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            } else {
                cart.products.push({_id: pid})
                let update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addProducts (cid, array) {
        try {
            let cart = await CartModel.findById(cid)
            array.forEach(async element => {
                console.log(element);
                const { _id, quantity } = element
                let id = cart.products.findIndex(prod => prod.id === _id)
                if (id > -1) {
                    console.log("Este producto ya existe");
                    cart.products[id].quantity += parseInt(quantity)
                }
                else {
                    cart.products.push(element)
                    console.log(`Producto nuevo agregado`);
                }
            });
            let update = await CartModel.findByIdAndUpdate(cid, cart)
            return update
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(cid, pid) {
        try {
            let cart = await CartModel.findById(cid)
            let product = cart.products.findIndex(prod => prod.id === pid)
            if (product > -1) {
                cart.products.splice((product), 1)
                let update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            } else {
                return "No puedes eliminar un producto inexistente"
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(cid) {
        try {
            let cart = await CartModel.findById(cid)
            cart.products = []
            console.log(cart.products);
            let update = await CartModel.findByIdAndUpdate(cid, cart)
            return update
        } catch (error) {
            console.log(error);
        }
    }
}