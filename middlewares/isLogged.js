const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/Users/user')

const protect = asyncHandler(async (req, res, next) => {
  console.log("protect middleware Called")
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header

      token = req.headers.authorization.split(' ')[1]
      // Verify token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
      // Get user from the token
      const user = await User.findById(decoded.payload).select('-password -createdAt -updatedAt')
      req.user = user;
      next()
    } catch (error) {
      console.log("Error========================",error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = protect;