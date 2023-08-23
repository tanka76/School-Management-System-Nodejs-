const express = require('express');
const {registerUserController,loginUserController,getUserProfileController} = require('../../controllers/authController')

const protect = require('../../middlewares/isLogged');

const authRouter = express.Router()

authRouter.post('/register',registerUserController);
authRouter.post('/login',loginUserController);


// protected route
authRouter.get('/profile',protect,getUserProfileController);



module.exports = authRouter;