// import passport from "passport"

// const adminAuth = strategy =>{
//     return async (req, res, next) =>{
//         passport.authenticate(strategy, function(err, user, info){
//             if(err) return next(err)
//             if(!user) return res.status(401).send({status: 'error', error: info.message ? info.message : info.toString()})
//             req.user = user
//             next()
//         })(req, res, next)
//     }
// } 

// export default adminAuth

const authorization = (role) => {
    return async (req, res, next) => {
        console.log('role: ', role)
        console.log('user: ', req.user.role)
        if(!req.user) return res.status(401).json({status: 'error', error: 'Unauthorized'})
        if(req.user.role!==role) return res.status(403).json({status: 'error', error: 'No permissions'})
        next()
    }
}

export default authorization
