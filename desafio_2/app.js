const fs = require('fs')
class ProductManager {
  #products
  #codes
  constructor(path) {
    this.path = path
    this.#products = []
    this.#codes = [];
    this.#createFile()
  }

  async #createFile () {
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8')
      let dataJS = JSON.parse(data)
      this.#products = dataJS
    } catch (error){
      await this.#addProductsToFile(this.path, this.#products)
    }
  }

  async #addProductsToFile (path, data) {
    await fs.promises.writeFile(path, JSON.stringify(data))
  }

  async getProducts (){
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8')
      let dataJS = JSON.parse(data)
      return dataJS
    } catch (error){
      console.log(error)
    }
  };

  addProducts (title, description, price, thumbnail, code, stock) {
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
      this.#addProductsToFile(this.path, this.#products)
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

  async getProductById (id) {
    let data = await this.getProducts()

    function findId(product) {
      return product.id === id;
    }

    if (data.find(findId) === undefined) {
      console.log("No existe producto con ese ID");
    } else {
      return data.find(findId);
    }
  };

  async deleteProduct (id) {
    let data = await this.getProducts()
    
    function findId(product) {
      return product.id === id;
    }

    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    
      if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
      }
    
      return arr;
    }    

    if (data.find(findId) === undefined) {
      console.log("No existe producto con ese ID");
    } else {
      removeObjectWithId(this.#products, id)
      this.#addProductsToFile(this.path, this.#products)
    }
  }

  async updateProduct (id, updateName, update) {
    if (updateName === 'id') {
      console.log('No puedes cambiar el ID del producto');
    }
    else{
      let product = await this.getProductById(id)
      await this.deleteProduct(id)
      product[updateName] = update 
      this.#products.push(product)
      await this.#addProductsToFile(this.path, this.#products)
    }
  }

}

const productManager = new ProductManager('./archivo.json');
productManager.addProducts(
  "producto prueba", //title
  "Este es un producto prueba", //description
  200, //price
  "Sin imagen", //thumbnail
  "abc123", //code
  25 //stock
);
// productManager.addProducts(
//   "PRODUCTO NUEVO",
//   "PRODUCT NUEVO",
//   200,
//   "Sin imagen",
//   "abd123",
//   25
// );
//productManager.getProductById(1);
//productManager.deleteProduct(1)
// productManager.updateProduct(1, 'title', 'nuevo titulo') //id, propiedad, valor
