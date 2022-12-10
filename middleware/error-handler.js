const { ApiError } = require( '../helpers/api-response' );

module.exports = ( err, req, res, next ) => {

  if ( err instanceof ApiError ) {
    return res.json( err.toJSON() );
  }

  return res.json( new ApiError() );
};
