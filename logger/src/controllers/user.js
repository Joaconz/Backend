import { userService } from "../services";

class UserController {
    async getUsers(req, res){
        try {
            let users = await userService.getUsers()
            users === undefined ? 
            res.status(400).send("no users"):
            res.status(200).send(users)
        } catch (error) {
            req.logger.error(error);
        }
    }
    async getUser(req, res){
        try {
            const {tid} = req.params
            const user = await userService.getUser(tid)
            user === undefined ? 
            res.status(400).send("no user"):
            res.status(200).send(user)
        } catch (error) {
            req.logger.error(error);
        }
    }
    async createUser(req, res){
        try {
            const {body} = req
            const resp = await userService.createUser(body)
            resp === undefined ? 
            res.status(400).send("no created"):
            res.status(200).send(resp)
        } catch (error) {
            req.logger.error(error);
        }
    }
    // async updateUser(req, res){
        
    // }
    async deleteUser(req, res){
        try {
            const {tid} = req.params
            const deleted = await userService.deleteUser(tid)
            deleted === undefined ? 
            res.status(400).send("no deleted"):
            res.status(200).send(deleted)
        } catch (error) {
            req.logger.error(error);
        }
    }
}