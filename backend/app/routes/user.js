const app = require("../../app")
const appConfig = require('./../../config/appConfig')
const userController = require('./../contollers/userController');
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/users`;

    // params: firstName, lastName, email, mobileNumber, password, apiKey.
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    app.post(`${baseUrl}/login`, userController.loginFunction);

    app.post(`${baseUrl}/forgotpassword`, userController.forgotPassword);

    app.post(`${baseUrl}/resetpassword`, userController.resetPassword);

    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

}