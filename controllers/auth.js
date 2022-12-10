const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const { ApiError, JSONResponse } = require( '../helpers/api-response' );
const jwt = require( 'jsonwebtoken' );

const User = mongoose.model( 'User' );

const register = async ( req, res, next ) => {
  try {
    const body = req.body;
    const existsEmail = await User.findOne({
      email: body.email.toLowerCase(),
    });
    if (existsEmail) {
      throw {
        status: 503,
        message: 'This email already exist',
      };
    }
    body.password = bcrypt.hashSync( body.password, 10 );
    body.email = body.email.toLowerCase();
    const register_data = {
      ...body,
    };
    const newUser = await User.create({ ...register_data }); //.create(body);
    newUser._id = newUser._id.toString();
    const tokens = generateTokens(newUser);
    return res.json( new JSONResponse( false, "", 200, tokens, Date.now() ) );
      
  } catch ( error ) {
    return res.json(new ApiError(true, error.message, error.status, null, Date.now()));
  }
};

const login = async ( req, res, next ) => {
  const body = req.body;
  try {
    const user = await User.findOne({
      email: body.email.toLowerCase().trim(),
    });

    if (!user) {
      throw {
        status: 503,
        message: 'Wrong email or password',
      };
    }
    if (!user.password) {
      user.password = '';
    }
    const compare = await bcrypt.compare(
      body.password.trim(),
      user.password,
    );

    if (!compare) {
      throw {
        status: 503,
        message: 'Wrong email or password',
      };
    }

    if (user.is_banned) {
      throw {
        status: 503,
        message: 'User has been banned',
      };
    }
    const tokens = generateTokens(user);

    return res.json( new JSONResponse( false, "", 200, tokens, Date.now() ) );
      
  } catch ( error ) {
    return res.json(new ApiError(true, error.message, error.status, null, Date.now()));
  }
};

generateTokens = (body) =>{
  body.id = body._id.toString();
  const access_token = jwt.sign({
    id: body.id,
    name:body.name, 
    email: body.email, 
    is_banned: body.is_banned,
    is_deleted: body.is_deleted
  }, $config.JWTSecret, {
    expiresIn: $config.JWTExpiry
  });

  const tokens = {
    access_token,
  };

  return tokens;
}


module.exports = {
  register,
  login,
};
