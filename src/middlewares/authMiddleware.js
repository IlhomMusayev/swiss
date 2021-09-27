module.exports = async function AuthMiddleware(req, res, next) {
	if (!req.user) {
        res.redirect("/");
	} else {
		next();
	}
};