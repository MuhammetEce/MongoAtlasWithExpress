const express = require( 'express' );
const router = express.Router();
const {
  login, register,
} = require( '../controllers/auth' );
const { registerValidation, loginValidation } = require( '../middleware/validation' );

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)

module.exports = router;
