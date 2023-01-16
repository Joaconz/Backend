class ProductManager {
  #products
  #codes
  constructor(path) {
    this.path = path
    this.#products = [];
    this.#codes = [];
    this.createFile(path)
  }

  createFile = async (path) => {
    const fs = require('fs')
    await fs.promises.writeFile(path, JSON.stringify(this.#products))
  }

  addProductsToFile = async (path, data) => {
    const fs = require('fs')
    await fs.promises.writeFile(path, JSON.stringify(data))
  }

  getProducts = async (path) => {
    const fs = require('fs')
    let array = []
    await fs.promises.readFile(path, (err, data)=>{
      if (err) console.log(err)
      else {array = JSON.stringify(data)}
    })
    return array
  };

  addProducts = (title, description, price, thumbnail, code, stock) => {
    const newProduct = () => {
      this.#codes.push(code);
      let newId = 1
      if (this.#products.length > 0) newId = this.#products.length + 1
      this.#products.push({
        id: newId,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      });
      this.addProductsToFile(this.path, this.#products)
    };

    if (this.#products.length === 0) {
      newProduct();
    } else {
      if (this.#codes.includes(code)) {
        console.log("El producto ya existe");
      } else {
        newProduct();
      }
    }
  };

  getProductById = (id) => {
    function findId(product) {
      return product.id === id;
    }

    if (this.#products.find(findId) === undefined) {
      console.log("No existe producto con ese ID");
    } else {
      console.log(this.#products.find(findId));
    }
  };
}

const productManager = new ProductManager('./archivo.json');
productManager.addProducts(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
// console.log(productManager.getproducts())
// productManager.addProducts(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   "abc123",
//   25
// );
productManager.addProducts(
  "PRODUCTO NUEVO",
  "PRODUCT NUEVO",
  200,
  "Sin imagen",
  "abd123",
  25
);
// productManager.addProducts(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   "abe123",
//   25
// );
// productManager.getProductById(1);
console.log(productManager.getProducts('./archivo.json'));
