import { Schema, model } from 'mongoose'
const cartCollection = 'carts'

const ProductSchema = new Schema({
    quantity : {
        type: Number,
        default: 1
    }
})

const CartSchema = new Schema({
    products: [
        ProductSchema
    ]
})

const CartModel = model(cartCollection, CartSchema)

export default CartModel