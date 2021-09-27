module.exports = async function AdminAuthMiddleware(req, res, next) {
    if (req.user) {
        if (!req.user.isAdmin) {
            res.redirect('/')
        } else {
            next()
        }
    }else{
        res.redirect('/')
    }
}