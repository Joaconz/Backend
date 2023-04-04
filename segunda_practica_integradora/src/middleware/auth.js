// const auth = (role) => {
//     return async (req, res, next) => {
//         if(!req.user) return  res.status(401).json({status: 'error', error: 'Unautorized'})
//         if(req.user.role !== role) return res.status(403).json({status: 'error', error: 'No permissions'})
//         next()
//     }
// }

// export default auth

// function auth (req, res, next){
//     if (req.session) {
//         return next()
//     }

//     return res.status(401).send('authentication error')
// }

// export default auth

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

