const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema( {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  is_banned: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
}, {
  collection  : 'user',
  minimize    : false,
  versionKey  : false,
  autoIndex   : false,
  timestamps: { createdAt: 'at_created', updatedAt: 'at_updated' },
} );

module.exports = mongoose.model( 'User', UserSchema );
