const express = require('express');
const {registerUserController,loginUserController,getUserProfileController,getAllUserController} = require('../../controllers/authController')

const protect = require('../../middlewares/isLogged');
const isAdmin = require('../../middlewares/isAdmin');

const authRouter = express.Router()

authRouter.post('/register',registerUserController);
authRouter.post('/login',loginUserController);


// protected route
authRouter.get('/profile',protect,getUserProfileController);
authRouter.get('/alluser',protect,isAdmin,getAllUserController);



module.exports = authRouter;