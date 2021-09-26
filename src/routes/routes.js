const HomeRoute = require('./HomeRoute');
const AboutRouter = require('./AboutRoute');
const AccountRouter = require('./AccountRoute');
const AdminRouter = require('./AdminRoute');
const AppointmentRouter = require('./AppointmentRoute');
const ContactRouter = require('./ContactsRoute');
const CosmeticRouter = require('./CosmeticRoute');
const LoginRouter = require('./LoginRoute');
const LogoutRouter = require('./LogoutRoute');
const RegisterRouter = require('./RegisterRoute');
const TreatmentRouter = require('./Treatment');

module.exports = (app) => {
	app.use(HomeRoute.path, HomeRoute.router);
	app.use(AboutRouter.path, AboutRouter.router);
	app.use(AccountRouter.path, AccountRouter.router);
	app.use(AdminRouter.path, AdminRouter.router);
	app.use(AppointmentRouter.path, AppointmentRouter.router);
	app.use(ContactRouter.path, ContactRouter.router);
	app.use(CosmeticRouter.path, CosmeticRouter.router);
	app.use(LoginRouter.path, LoginRouter.router);
	app.use(LogoutRouter.path, LogoutRouter.router);
	app.use(RegisterRouter.path, RegisterRouter.router);
	app.use(TreatmentRouter.path, TreatmentRouter.router);
};