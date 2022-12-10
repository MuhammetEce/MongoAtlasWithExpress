const { ApiError } = require("../helpers/api-response");

const registerValidation = async ( req, res, next ) => {
    const data = req.body;
    try {
      data.email = data.email.trim();
      data.password = data.password.trim();
      notNullControl(data.name, 'name');
      notNullControl(data.email, 'email');
      notNullControl(data.password, 'password');

      minLengthControl(data.name, 2, 'name')
      minLengthControl(data.password, 8, 'password')

      maxLengthControl(data.name, 45, 'name')
      maxLengthControl(data.password, 45, 'password')
      maxLengthControl(data.email, 45, 'email')

      regexMatchControl(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#+/()=_,.:;]{8,}$/, data.password,  'password')
      regexMatchControl('[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}'+'\\@'+'[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}'+'('+'\\.'+
        '[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}'+')+',
        data.email,
        'email')
      
      return next();
      
    } catch (error) {
        return res.json(new ApiError(true, error.message, error.status, null, Date.now()));
    }
  }

  const loginValidation = async ( req, res, next ) => {
  const data = req.body
    try {
      data.email = data.email.trim();
      data.password = data.password.trim();

      notNullControl(data.email, 'email');
      notNullControl(data.password, 'password');

      minLengthControl(data.password, 8, 'password')

      maxLengthControl(data.password, 45, 'password')
      maxLengthControl(data.email, 45, 'email')

      regexMatchControl(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#+/()=_,.:;]{8,}$/, data.password,  'password')
      regexMatchControl('[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}'+'\\@'+'[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}'+'('+'\\.'+
        '[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}'+')+',
        data.email,
        'email')

      return next();
      
      
    } catch (error) {
        return res.json(new ApiError(true, error.message, error.status, null, Date.now()));
    }
  }
  
  const notNullControl = (field, key) => {
    if (!field) {
      throw {
        status: 503,
        message: `${key} cannot be empty`,
      };
    }
    return;
  }

  const maxLengthControl = (field, length, key) => {
    if (field.length >= length) {
      throw {
        status: 503,
        message: `${key} must include max ${length} chars!`,
        lang,
        arg,
      };
    }
    return;
  }

  const minLengthControl = (field, length, key) => {
    if (field.length < length) {
      throw {
        status: 503,
        message: `${key} must include at least 2 chars!`,
      };
    }
    return;
  }

  const regexMatchControl = (rgx, value, key) => {
    const regex = new RegExp(rgx);

    if (!regex.test(value)) {
      const message = `Please check the ${key} format!`;
      throw {
        status: 503,
        message,
      };
    }
    return;
  }

  module.exports = {
    registerValidation,
    loginValidation
  };