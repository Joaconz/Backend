import fs from 'fs'
export default class CartManager {
    #carts
    constructor(path){
        this.path = path
        this.#carts = []
        this.#createFile()
    }

    async #createFile () {
        try {
          let data = await fs.promises.readFile(this.path, 'utf-8')
          let dataJS = JSON.parse(data)
          this.#carts = dataJS
        } catch (error){
          await this.#addProductsToFile(this.path, this.#carts)
        }
    }

    async #addProductsToFile (path, data) {
        await fs.promises.writeFile(path, JSON.stringify(data))
    }

    async createCart (){
        let newId = 1
        if (this.#carts.length > 0) newId = this.#carts.length + 1
        this.#carts.push({
            id: newId,
            products: []
        })
        this.#addProductsToFile(this.path, this.#carts)
    }

    async #allCarts (){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)
            return dataJS
          } catch (error){
            console.log(error)
          }
    }

    async getProducts (id){
        let data = await this.#allCarts()
        // console.log(data);

        function findId(cart) {
            return cart.id === id;
          }
      
          if (data.find(findId) === undefined) {
            console.log("No existe carrito con ese ID");
          } else {
            // console.log(data.find(findId));
            return data.find(findId);
          }
    }

    async addProduct (cid, pid, quantity){

    }
}