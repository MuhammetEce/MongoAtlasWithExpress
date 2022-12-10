const express = require( 'express' );
const router = express.Router();
const { verifyUser } = require( '../middleware/verify' );
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require( '../controllers/user' );

router.get( '/profile', verifyUser, getProfile );
router.put( '/profile', verifyUser, updateProfile );
router.delete( '/profile', verifyUser, deleteProfile );

module.exports = router;