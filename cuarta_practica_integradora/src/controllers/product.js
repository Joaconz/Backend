import { request } from "express";
import { productService } from "../services/index.js";
import CustomError from "../services/errors/CustomError.js";
import { EErrors } from "../services/errors/enums.js";

class ProductController {
  getProducts = async (req = request, res) => {
    const { limit, page, query, sort } = req.query;
    const { docs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } =
      await productService.getProducts(limit, page, query, sort);
    if (!docs || docs.length === 0) {
      return res.status(404).json({
        msg: "No existen productos",
        products: false,
      });
    }
    res.status(200).json({
      status: "success",
      payload: docs,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      prevLink: prevPage
        ? `http://localhost:8080/api/products?page=${prevPage}`
        : null,
      nextLink: nextPage
        ? `http://localhost:8080/api/products?page=${nextPage}`
        : null,
      page,
    });
  };

  getView = async (req = request, res) => {
    const { limit, page, query, sort } = req.query;
    let info = await productService.getProducts(limit, page, query, sort);
    let products = info.docs;
    products = products.map((item) => item.toObject());
    if (req.session.user !== undefined) {
      let user = {
        first_name: req.session.user.first_name
          ? req.session.user.first_name
          : req.session.user.name,
        isAdmin: req.session.role,
      };
      res.render("products", {
        user,
        products,
      });
    } else {
      req.logger.error("No session left")
      res.status(500).redirect("../../auth/login");
    }
  };

  getPID = async (req = request, res) => {
    const { pid } = req.params;
    let products = await productService.getProduct(parseInt(pid));
    res.send(products);
  };

  addProduct = async (req = request, res) => {
    let product = req.body;
    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.stock ||
      !product.category
    ) {
      // return res.status(400).send({ message: "Completar los datos faltantes" });
      CustomError.createError({
        name: "Product not created",
        cause: createProductErrorInfo({
          title: product.title,
          description: product.description,
          code: product.code,
          price: product.price,
          stock: product.stock,
          category: product.category,
        }),
        message: "Error in creating a product",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    productService.createProduct({
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
      category: product.category,
      owner:
        req.session.user.email === undefined ? "admin" : req.session.user.email,
    });
    res.status(201).send({
      product,
      message: "producto agregado",
    });
  };

  updateProduct = async (req = request, res) => {
    const { pid } = req.params;
    if (req.session.user === undefined) {
      CustomError.createError({
        name: "Session has finished",
        cause: sessionErrorInfo(),
        message: "Error in setting a user from session",
        code: EErrors.SESSION_ERROR,
      });
    }
    let productOwner = productService.getProduct(pid);
    if (
      productOwner.owner === req.session.user.email ||
      req.session.user.role === "admin"
    ) {
      let product = req.body;
      let entries = Object.entries(product);
      entries.forEach(async (keyValue) => {
        productService.updateProduct(parseInt(pid), keyValue);
      });

      res.status(201).send({
        product,
        message: "Producto modificado",
      });
    } else {
      res.status(400).send({
        message: "No puedes modificar el producto",
      });
    }
  };

  deleteProduct = async (req = request, res) => {
    const { pid } = req.params;
    if (req.session.user === undefined) {
      CustomError.createError({
        name: "Session has finished",
        cause: sessionErrorInfo(),
        message: "Error in setting a user from session",
        code: EErrors.SESSION_ERROR,
      });
    }
    let productOwner = productService.getProduct(pid);
    if (
      productOwner.owner === req.session.user.email ||
      req.session.user.role === "admin"
    ) {
      productService.deleteProduct(parseInt(pid));
      res.status(201).send({
        message: "Producto Eliminado",
      });
    } else {
      res.status(400).send({
        message: "No puedes eliminar el producto",
      });
    }
  };
}

export default ProductController;
