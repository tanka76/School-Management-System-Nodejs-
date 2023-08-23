const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/Users/user')

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if(user.user_type === 'admin'){
    next()
  }
  else{
    next(new Error("You donnot have permission,User must be admin"))
  }
  
})

module.exports = isAdmin;