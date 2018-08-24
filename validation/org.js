const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOrgInput(data) {
  let errors = {};

  data.orgname = !isEmpty(data.orgname) ? data.orgname : '';
  data.imgURL = !isEmpty(data.imgURL) ? data.imgURL : '';
  data.about1 = !isEmpty(data.about1) ? data.about1 : '';
  data.support1 = !isEmpty(data.support1) ? data.support1 : '';
      
  if (Validator.isEmpty(data.orgname)) {
    errors.title = 'Article title is required';
  }

  if (!isEmpty(data.imgURL)) {
    if (!Validator.isURL(data.imgURL)) {
      errors.imgURL = 'Not a valid image URL';
    }
  }

  if (Validator.isEmpty(data.about1)) {
    errors.about1 = 'About field is required';
  }

  if (Validator.isEmpty(data.support1)) {
    errors.support1 = 'Support field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
