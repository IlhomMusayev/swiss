const { findUserByEmail} = require("../models/UserModel");
const { checkToken } = require("../modules/jwt");

module.exports = async function UserMiddleware(req, res, next) {
	try {
		if (!req.cookies.token) {
			next();
			return;
		}
		const data = await checkToken(req.cookies.token);

		if (!data) {
			next();
			return;
		}

        const user = await findUserByEmail(data.email)

        if (!user) {
            next();
            return;
        }

		req.user = data;

		next();
	} catch (error) {
		next();
	}
};