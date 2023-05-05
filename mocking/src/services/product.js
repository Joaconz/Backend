export default class ProductService {
    constructor(dao){
        this.dao = dao
    }

    async getProducts(limit, page, query, sort){
        try {
            return await this.dao.get(limit, page, query, sort)            
        } catch (error) {
            return error
        }
    }

    async getProduct(pid){
        try {
            return await this.dao.getById(pid)
        } catch (error) {
            return error
        }
    }
    
    async createProduct(newProduct){
        try {            
            return await this.dao.create(newProduct)                         
        } catch (error) {
            return error
        }
    }

    async updateProduct(pid, updateProduct){
        try {
            return await this.dao.update(pid, updateProduct)
        } catch (error) {
            return error
        }
    } 

    async deleteProduct(pid){
        try {
            return await this.dao.delete(pid)
        } catch (error) {
            return error
        }
    }    
}