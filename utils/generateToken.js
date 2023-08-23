const tokenSercet = process.env.TOKEN_SECRET;
const tokenExpireTime = process.env.JWT_EXPIRE_TIME;

var jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
    return jwt.sign({ payload}, tokenSercet, { expiresIn: tokenExpireTime });
  };


  const verifyToken = token => {
    return jwt.verify(token, tokenSecret, (err, decoded) => {
        if (err) {
            return {
                msg: "Invalid Token"
            };
        } else {
            return decoded;
        }
    });
};



module.exports = {generateAccessToken,verifyToken};
