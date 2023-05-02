// import { request, response } from "express"

// function auth (req, res, next){
//     if (req.session) {
//         return next()
//     }
//     return res.status(401).send('authentication error')
// }

// export default auth

// function auth (req, res, next){
//     console.log('auth: ',req.session)
//     // if (req.session?.user.name !== 'fede fede' || !req.session?.admin ) {
//     if (req.session?.user.name !== 'fede fede' ) {
//         return res.send('No estas autorizado para ver esta página, por favor')
//     }
    
//     return next()
// }


import passport from "passport"


const auth = strategy =>{
    return async (req, res, next) =>{
        passport.authenticate(strategy, function(err, user, info){
            if(err) return next(err)
            if(!user) return res.status(401).send({status: 'error', error: info.message ? info.message : info.toString()})
            req.user = user
            next()
        })(req, res, next)
    }
} 

export default auth

