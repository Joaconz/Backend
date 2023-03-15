import { Router } from "express";

const router = Router()

router.get('/login', (req, res)=>{
    const {username, password} = req.query
    // console.log(data)
    if (username !== 'fede' || password !== 'admin') {
        return res.send('login falló')
    } else {

        req.session.user = username
        // req.session.counter = 1
        // req.session.password = password
        req.session.admin = true
        res.send({mensaje: 'login ok', username})
    }
})

/// ______________________________________________

router.get('/session', (req, res)=>{
    if (req.session.counter) {
        req.session.counter++
        res.send(`Bienvenido a tu visita número ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido a tu primera visita')
    }
})


router.get('/logout', (req, res)=>{
    req.session.destroy(err => {
        if(!err) res.send('logout ok')
        else res.send({status:'Logout error', message: err})
    })
    
})

export default router