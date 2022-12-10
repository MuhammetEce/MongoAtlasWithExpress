const mongoose    = require( 'mongoose' );
const { ApiError, JSONResponse } = require( '../helpers/api-response' );

const User = mongoose.model( 'User' );
const { ObjectId } = mongoose.Types;

const getProfile = async ( req, res, next ) => {
  try {
    const profile = await User.findById(
      req.user.id,
      '_id name email',
    );

    return res.json( new JSONResponse( false, "", 200, profile, Date.now() ) );
    
  } catch ( error ) {
    return res.json(new ApiError(true, error.message, error.status, null, Date.now()));
  }
};

const updateProfile = async ( req, res, next ) => {
  try {
    const body = req.body;
    
    await User.updateOne({ _id: req.user.id },{ $set:body });
    return res.json( new JSONResponse( false, "", 200, body, Date.now() ) );
  } catch ( error ) {
    return res.json(new ApiError(true, error.message, error.status, null, Date.now()));
  }
};

const deleteProfile = async ( req, res, next ) => {
  try {
    const body = {
      name: '*****',
      email: `${req.user.id}*****@**.com`,
      is_deleted: true,
      is_banned: false,
    };
    await User.updateOne({_id:req.user.id}, { $set:body});
    return res.json( new JSONResponse( false, "", 200, true, Date.now() ) );
  } catch ( error ) {
    return res.json(new ApiError(true, error.message, error.status, null, Date.now()));
  }
};


module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
