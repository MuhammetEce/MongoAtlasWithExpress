const yaml = require( 'js-yaml' );
const fs = require( 'fs' );
const path = require( 'path' );

module.exports = () => {
  console.log( `NODE_ENV [ ${process.env.NODE_ENV} ]\n` );

  let p = '';
  switch ( process.env.NODE_ENV ) {
    case 'local':
      p = path.resolve( __dirname, '../environment/local.yml' );
      break;
    /* case 'dev':
      p = path.resolve( __dirname, '../environment/dev.yml' );
      break; */

    default:
      throw new Error( 'Not Acceptable Environment!' );
  }

  const config = yaml.load( fs.readFileSync( p, 'utf8' ) );
  global.$config = config;

  return true;
};
