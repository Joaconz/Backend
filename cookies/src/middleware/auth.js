function auth (req, res, next){
    if (req.session?.user === 'joaco' && req.session?.admin ) {
        return next()
    }

    return res.status(401).send('authentication error')
}

export default auth
