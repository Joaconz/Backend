import { request } from "express";
import CartManager from "../dao/CartManager.js";
const cartManager = new CartManager();

class CartController {
  getView = async (req = request, res) => {
    const { cid } = req.params;
    let info = await cartManager.getCart(cid);
    let products = info.products;
    products = products.map((item) => item.toObject());
    let cart = {
      _id: info._id,
      products,
    };
    // cart =  cart.map(item => item.toObject())
    res.render("carts", {
      cart,
    });
    // res.send(info)
  };

  createCart = async (req = request, res) => {
    //crear un carrito con id y array de products vacio
    await cartManager.createCart();
    res.status(201).send("New Cart created");
  };

  getCart = async (req = request, res) => {
    //mostrar el array de productos del carrito seleccionado
    const { cid } = req.params;
    let cart = await cartManager.getCart(cid);
    res.status(201).send({ products: cart.products });
  };

  addProductQuantity = async (req = request, res) => {
    //agregar el producto al carrito seleccionado, es un objeto con el id y cantidad del producto
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    let cart = await cartManager.addProductQuantity(cid, pid, quantity);
    res.status(201).send({
      "new cart": cart,
      message: "Product added",
    });
  };

  addProducts = async (req = request, res) => {
    const { cid } = req.params;
    let array = req.body;
    let cart = await cartManager.addProducts(cid, array);
    res.status(201).send({
      "new cart": cart,
      message: "Products added",
    });
  };

  deleteProduct = async (req = request, res) => {
    const { cid, pid } = req.params;
    let cart = await cartManager.deleteProduct(cid, pid);
    res.status(201).send({
      "new cart": cart,
      message: "Product deleted",
    });
  };

  deleteCart = async (req = request, res) => {
    const { cid } = req.params;
    let cart = await cartManager.deleteCart(cid);
    res.status(201).send({
      "new cart": cart,
      message: "Cart deleted",
    });
  };
}

export default CartController;
