class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
    this.codes = [];
  }

  getproducts = () => {
    console.log(this.products)
  };

  addProducts = (title, description, price, thumbnail, code, stock) => {
    const newProduct = () => {
      this.codes.push(code);
      this.id += 1;
      this.products.push({
        id: this.id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      });
    };

    if (this.products.length === 0) {
      newProduct();
    } else {
      if (this.codes.includes(code)) {
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

    if (this.products.find(findId) === undefined) {
      console.log("No existe producto con ese ID");
    } else {
      console.log(this.products.find(findId));
    }
  };
}

const productManager = new ProductManager();
productManager.getproducts()
productManager.addProducts(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
productManager.getproducts()
productManager.addProducts(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
productManager.getProductById(1);