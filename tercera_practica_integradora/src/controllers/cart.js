import { request } from "express";
// import CartManager from "../dao/CartManager.js";
// const cartManager = new CartManager();
import { cartService, productService, ticketService, userService } from "../services/index.js"
import {transport} from "../utils/mailer.js";

class CartController {
  getView = async (req = request, res) => {
    const { cid } = req.params;
    let info = await cartService.getCart(cid);
    let products = info.products;
    products = products.map((item) => item.toObject());
    let cart = {
      _id: info._id,
      products,
    };
    res.render("carts", {
      cart,
    });
  };

  createCart = async (req = request, res) => {
    //crear un carrito con id y array de products vacio
    await cartService.createCart();
    res.status(201).send("New Cart created");
  };

  getCart = async (req = request, res) => {
    //mostrar el array de productos del carrito seleccionado
    const { cid } = req.params;
    let cart = await cartService.getCart(cid);
    res.status(201).send({ products: cart.products });
  };

  addProductQuantity = async (req = request, res) => {
    //agregar el producto al carrito seleccionado, es un objeto con el id y cantidad del producto
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    let cart = await cartService.addProductQuantity(cid, pid, quantity);
    res.status(201).send({
      "new cart": cart,
      message: "Product added",
    });
  };

  addProduct = async (req = request, res) => {
    const { cid, pid } = req.params;
    if (req.session.user === undefined) {
      CustomError.createError({
        name: "Session has finished",
        cause: sessionErrorInfo(),
        message: "Error in setting a user from session",
        code: EErrors.SESSION_ERROR,
      });
    }
    let productOwner = productService.getProduct(pid);
    if (productOwner.owner === req.session.user.email){
      res.status(400).send({
        message: "You cant add your own product to your cart"
      });
    }
    let cart = await cartService.addProduct(cid, pid);
    res.status(201).send({
      "new cart": cart,
      message: "Product added",
    });
  };

  addProducts = async (req = request, res) => {
    const { cid } = req.params;
    let array = req.body;
    let cart = await cartService.addProducts(cid, array);
    res.status(201).send({
      "new cart": cart,
      message: "Products added",
    });
  };

  deleteProduct = async (req = request, res) => {
    const { cid, pid } = req.params;
    let cart = await cartService.deleteProduct(cid, pid);
    res.status(201).send({
      "new cart": cart,
      message: "Product deleted",
    });
  };

  deleteCart = async (req = request, res) => {
    const { cid } = req.params;
    let cart = await cartService.deleteCart(cid);
    res.status(201).send({
      "new cart": cart,
      message: "Cart deleted",
    });
  };

  finishProcess = async (req = request, res) => {
    const { cid } = req.params;
    let cart = await cartService.getCart(cid)
    let confirmation = await cartService.finishProcess(cart)
    if (confirmation.products.length > 0) {
      let user = await userService.getUserByEmail(req.session.user.email)
      let ticket = await ticketService.createTicket(confirmation, user._id)
      let result = await transport.sendMail({
        from: "Coder Tests <joaquinunez2004@gmail.com>",
        to: "joaquinunez2004@gmail.com",
        subject:"New Ticket",
        html: `<div>
        <h1>Purchase confirmed!</h1>
        <h2>Dates of purchase: </h2>
        <div>
          <p>Ticket ID: ${ticket._id.toString()}</p>
          <p>Purchaser ID: ${ticket.purchaser.toString()}</p>
          <p>Purchase time: ${ticket.purchase_datetime}</p>
          <p>Amount: ${ticket.amount}</p>
          <p>Cart: </p>
          <ul>
            ${ticket.cart.products.map((element)=>{
                return (`<li>${element.productId.title}</li>`)
            })}
          </ul>
        </div>
        </div>`
      })
      res.status(201).send({
        "new ticket": ticket,
        "new cart": confirmation,
        message: "Cart Processed",
      });
    }
    else {
      res.status(400).send({
        // "new ticket": ticket,
        // "new cart": confirmation,
        message: "We couldn't finish the purchase, please add products with stock",
      });
    }
  }
}

export default CartController;
