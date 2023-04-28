import { Router } from "express";
// import passport from "passport";
// import UserModel from "../dao/models/user.js";

const router = Router()

router.get('/current', async (req, res)=> {
    req.session.user = req.user
    if (req.user) {
        res.status(200).send(req.user)
    }
    else{
        res.status(401).send({status: 'error', message: 'No existe sesion'})
    } 
})

export default router