const mongoose  = require( 'mongoose' );
const jwt = require('jsonwebtoken');
const { ApiError } = require( '../helpers/api-response' );

const User = mongoose.model( 'User' );
const { ObjectId } = mongoose.Types;

const verifyUser = async ( req, res, next ) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw {
          status:401,
          message: 'Authorization error!'
      }
    }
    const bearer = authorization.replace('Bearer', '').trim();
    const decoded = jwt.verify(bearer, $config.JWTSecret);
      if (!decoded || decoded.is_banned || decoded.is_deleted) {
        throw {
            status: 401,
            message: 'Authorization error!'
        }
      }
      req.user = decoded;
    
    next()
    
    // return next();
  } catch ( error ) {
    return res.json(new ApiError(true, error.message, error.status, null, Date.now()));
    // return next( new ApiError( 401, 'Unauthorized' ) );
  }
};


module.exports = {
  verifyUser,
};
