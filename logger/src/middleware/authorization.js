const authorization = (role) => {
    return async (req, res, next) => {
        req.logger.info('role: ', role)
        req.logger.info('user: ', req.user.role)
        if(!req.user) return res.status(401).json({status: 'error', error: 'Unauthorized'})
        if(req.user.role!==role) return res.status(403).json({status: 'error', error: 'No permissions'})
        next()
    }
}

export default authorization
