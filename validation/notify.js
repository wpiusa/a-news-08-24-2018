const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNotifyInput(data) {
  let errors = {};

  data.deviceid = !isEmpty(data.deviceid) ? data.deviceid : '';
  
  if (Validator.isEmpty(data.deviceid)) {
    errors.deviceid = 'Device Id is required';
  }
 
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
